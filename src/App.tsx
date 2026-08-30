import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { GISMapView } from './components/GISMapView';
import { PredictiveEngineView } from './components/PredictiveEngineView';
import { PrescriptiveActionsView } from './components/PrescriptiveActionsView';
import { ContinuousLearningView } from './components/ContinuousLearningView';
import { AlertsHubView } from './components/AlertsHubView';
import { ApiGatewayView } from './components/ApiGatewayView';
import { AuditRbacView } from './components/AuditRbacView';
import { SpecificationsView } from './components/SpecificationsView';
import { ReportGeneratorModal } from './components/ReportGeneratorModal';
import { CitizenLandInspectorView } from './components/CitizenLandInspectorView';
import { CitizenDashboardView } from './components/CitizenDashboardView';
import { InterDeptClearancesView } from './components/InterDeptClearancesView';

import { 
  INITIAL_PROJECTS, 
  INITIAL_MODEL_METRICS, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockProjects';

import { 
  LandAcquisitionProject, 
  UserRole, 
  ModelMetrics, 
  AlertNotification, 
  AuditLogEntry, 
  PrescriptiveAction 
} from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [currentRole, setCurrentRole] = useState<UserRole>('CENTRAL_MINISTRY');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [projects, setProjects] = useState<LandAcquisitionProject[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<LandAcquisitionProject>(INITIAL_PROJECTS[0]);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics>(INITIAL_MODEL_METRICS);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Sync theme with body class
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
  }, [theme]);

  // Handle Theme Toggle
  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Navigate to XAI Studio for a specific project
  const handleSelectProjectForXai = (project: LandAcquisitionProject) => {
    setSelectedProject(project);
    setActiveTab('PREDICTION_STUDIO');
  };

  // Navigate to GIS map for a specific project
  const handleSelectProjectForGis = (project: LandAcquisitionProject) => {
    setSelectedProject(project);
    setActiveTab('GIS_MAP');
  };

  // Navigate to Prescriptive Actions
  const handleNavigateToPrescriptive = (project: LandAcquisitionProject) => {
    setSelectedProject(project);
    setActiveTab('PRESCRIPTIVE_ACTIONS');
  };

  // Update Prescriptive Action Status
  const handleUpdateActionStatus = (actionId: string, status: PrescriptiveAction['status']) => {
    setProjects(prevProjects => {
      return prevProjects.map(p => {
        const updatedActions = p.prescriptiveActions.map(act => {
          if (act.id === actionId) {
            return { ...act, status };
          }
          return act;
        });
        return { ...p, prescriptiveActions: updatedActions };
      });
    });

    // Add Audit Log
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentRole === 'CENTRAL_MINISTRY' ? 'Central Apex Admin' : `${currentRole} Official`,
      role: currentRole,
      action: `Prescriptive Action Status changed to ${status}`,
      category: 'MITIGATION_STATUS',
      details: `Action ID ${actionId} was transitioned to ${status}.`,
      ipAddress: '10.24.110.42'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Ingest New Projects
  const handleIngestProjects = (newProjects: LandAcquisitionProject[]) => {
    setProjects(prev => [...newProjects, ...prev]);
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Bhoomi Rashi API Synchronizer',
      role: 'CENTRAL_MINISTRY',
      action: 'Batch Ingestion of New Infrastructure Projects',
      category: 'DATA_INGESTION',
      details: `Ingested ${newProjects.length} new corridor record(s) via REST Gateway.`,
      ipAddress: '127.0.0.1 (Gateway)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Handle Model Retrained
  const handleModelRetrained = (updatedMetrics: ModelMetrics) => {
    setModelMetrics(updatedMetrics);
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Continuous Learning MLOps Daemon',
      role: 'CENTRAL_MINISTRY',
      action: `Model Version Updated to ${updatedMetrics.version}`,
      category: 'MODEL_RETRAIN',
      details: `Retrained on ${updatedMetrics.totalTrainingSamples} samples. ROC-AUC: ${(updatedMetrics.rocAucScore*100).toFixed(1)}%, RMSE: ${updatedMetrics.rmseMonths}m.`,
      ipAddress: '127.0.0.1 (System)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Handle Mark Alert as Read
  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAlertsAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  const criticalAlertCount = alerts.filter(a => a.severity === 'CRITICAL' && !a.isRead).length;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        alerts={alerts}
        onOpenAlerts={() => setActiveTab('ALERTS')}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Layout: Sidebar + Viewport */}
      <div className="app-main-layout">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          currentRole={currentRole}
          criticalAlertCount={criticalAlertCount}
        />

        <main className="main-content-area">
          {activeTab === 'DASHBOARD' && (
            currentRole === 'CITIZEN_LANDOWNER' ? (
              <CitizenDashboardView
                projects={projects}
                onNavigateToTab={(t) => setActiveTab(t as NavTab)}
              />
            ) : (
              <DashboardView
                projects={projects}
                currentRole={currentRole}
                onRoleChange={setCurrentRole}
                onSelectProjectForXai={handleSelectProjectForXai}
                onSelectProjectForGis={handleSelectProjectForGis}
              />
            )
          )}

          {activeTab === 'CITIZEN_SEARCH' && (
            <CitizenLandInspectorView
              onOpenReport={() => setIsReportOpen(true)}
            />
          )}

          {activeTab === 'GIS_MAP' && (
            <GISMapView
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onNavigateToXai={handleSelectProjectForXai}
            />
          )}

          {activeTab === 'PREDICTION_STUDIO' && (
            <PredictiveEngineView
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onNavigateToPrescriptive={handleNavigateToPrescriptive}
            />
          )}

          {activeTab === 'INTER_DEPT_CLEARANCES' && (
            <InterDeptClearancesView
              projects={projects}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'PRESCRIPTIVE_ACTIONS' && (
            <PrescriptiveActionsView
              projects={projects}
              selectedProject={selectedProject}
              currentRole={currentRole}
              onUpdateActionStatus={handleUpdateActionStatus}
            />
          )}

          {activeTab === 'CONTINUOUS_LEARNING' && (
            <ContinuousLearningView
              modelMetrics={modelMetrics}
              onModelRetrained={handleModelRetrained}
            />
          )}

          {activeTab === 'ALERTS' && (
            <AlertsHubView
              alerts={alerts}
              currentRole={currentRole}
              onMarkAsRead={handleMarkAlertAsRead}
              onMarkAllAsRead={handleMarkAllAlertsAsRead}
            />
          )}

          {activeTab === 'API_GATEWAY' && (
            <ApiGatewayView
              projects={projects}
              onIngestProjects={handleIngestProjects}
            />
          )}

          {activeTab === 'AUDIT_RBAC' && (
            <AuditRbacView
              auditLogs={auditLogs}
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          )}

          {activeTab === 'SPECIFICATIONS' && (
            <SpecificationsView />
          )}
        </main>
      </div>

      {/* Printable Executive Briefing Modal */}
      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        projects={projects}
        modelMetrics={modelMetrics}
      />
    </div>
  );
}
export default App;
