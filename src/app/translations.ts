const baseTranslations = {
  en: {
    // App Name
    appName: 'SmartCompta AI',
    appTagline: 'Autonomous Invoice Processing',

    // Navigation
    nav: {
      dashboard: 'Dashboard',
      invoiceInbox: 'Invoice Inbox',
      outbox: 'Outbox',
      suppliers: 'Suppliers',
      reports: 'Reports',
      settings: 'Settings',
      accountants: 'Accountants',
      clients: 'Clients',
      documents: 'Documents',
      bank: 'Bank',
      adminPanel: 'Admin Panel',
    },

    // Header
    header: {
      searchPlaceholder: 'Search invoices, suppliers...',
      admin: 'Admin',
      logout: 'Logout',
    },

    // Dashboard
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your accounting operations',
      kpis: {
        monthlySpend: 'Total Monthly Spend',
        pendingInvoices: 'Pending Invoices',
        vatRecovery: 'Estimated VAT Recovery',
        invoices: 'invoices',
        fromLastWeek: 'from last week',
      },
      upload: {
        title: 'AI Magic Upload',
        processing: 'Processing invoice with AI...',
        extracting: 'Extracting data and validating fields',
        dragDrop: 'Drag & Drop Invoice Files',
        description: 'Upload PDF, JPG, or PNG files. Our AI will automatically extract supplier info, amounts, VAT, and ICE numbers.',
        browse: 'Browse Files',
      },
      recentActivity: {
        title: 'Recent Activity',
        processed: 'Processed',
        pending: 'Pending',
      },
    },

    // Invoice Inbox
    invoiceInbox: {
      title: 'Invoice Inbox',
      subtitle: 'Manage and review all invoices',
      exportSelected: 'Export Selected',
      searchPlaceholder: 'Search by supplier or ICE number...',
      filters: {
        allStatus: 'All Status',
        processed: 'Processed',
        pending: 'Pending',
        review: 'Review',
        dateRange: 'Date Range',
      },
      table: {
        preview: 'Preview',
        supplier: 'Supplier Name',
        ice: 'ICE Number',
        date: 'Date',
        totalTTC: 'Total TTC (MAD)',
        category: 'Category',
        status: 'Status',
      },
      noInvoices: 'No invoices found matching your criteria',
      showing: 'Showing',
      of: 'of',
      invoices: 'invoices',
      selected: 'selected',
    },

    // Invoice Editor
    invoiceEditor: {
      title: 'Invoice Editor',
      invoice: 'Invoice',
      backToInbox: 'Back to Inbox',
      preview: {
        title: 'Invoice Preview',
        date: 'Date',
        invoiceNumber: 'Invoice #',
        ice: 'ICE Number',
        items: 'Items',
        ht: 'Montant HT',
        tva: 'TVA 20%',
        ttc: 'Total TTC',
        aiDetected: 'Green highlights indicate AI-detected fields',
      },
      form: {
        title: 'Invoice Details',
        supplier: 'Supplier Name',
        ice: 'ICE Number',
        date: 'Invoice Date',
        ht: 'Montant HT',
        tva: 'TVA 20%',
        ttc: 'Total TTC',
        category: 'Category',
        confirmSave: 'Confirm & Save',
        flagError: 'Flag Error',
        saved: 'Invoice saved successfully! Redirecting...',
      },
    },

    // Supplier Directory
    suppliers: {
      title: 'Supplier Directory',
      subtitle: 'Manage your supplier relationships',
      addSupplier: 'Add Supplier',
      searchPlaceholder: 'Search suppliers by name or ICE number...',
      totalSpentYTD: 'Total Spent YTD',
      defaultCategory: 'Default Category',
      summary: {
        totalSuppliers: 'Total Suppliers',
        totalSpend: 'Total Spend YTD',
        activeCategories: 'Active Categories',
      },
    },

    // Reports
    reports: {
      title: 'Reports',
      subtitle: 'Financial insights and analytics',
      export: {
        title: 'Export Options',
        excel: 'Export to Excel',
        pdf: 'Export to PDF',
        sage: 'Sync with Sage',
        quickbooks: 'Sync with QuickBooks',
      },
      monthlySpending: {
        title: 'Monthly Spending',
        subtitle: 'Year to date comparison',
        download: 'Download',
      },
      vatBreakdown: {
        title: 'VAT Breakdown',
        subtitle: 'Collected vs Recoverable amounts',
        totalCollected: 'Total VAT Collected',
        totalRecoverable: 'Total VAT Recoverable',
        table: {
          category: 'Category',
          collected: 'VAT Collected (MAD)',
          recoverable: 'VAT Recoverable (MAD)',
          recoveryRate: 'Recovery Rate',
          total: 'Total',
        },
      },
    },

    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account and preferences',
      profile: {
        title: 'Profile Settings',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
      },
      company: {
        title: 'Company Information',
        name: 'Company Name',
        ice: 'Company ICE',
        address: 'Address',
      },
      notifications: {
        title: 'Notifications',
        email: {
          title: 'Email Notifications',
          description: 'Receive email alerts for new invoices',
        },
        processing: {
          title: 'Processing Alerts',
          description: 'Notify when AI completes invoice processing',
        },
        weekly: {
          title: 'Weekly Reports',
          description: 'Get weekly summary via email',
        },
      },
      security: {
        title: 'Security',
        changePassword: 'Change Password',
        twoFactor: {
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          enable: 'Enable',
        },
      },
      saveChanges: 'Save Changes',
    },

    // Categories
    categories: {
      fuel: 'Fuel',
      telecom: 'Telecom',
      utilities: 'Utilities',
      supplies: 'Supplies',
      rent: 'Rent',
      meals: 'Meals',
      itEquipment: 'IT Equipment',
      shipping: 'Shipping',
    },

    // Common
    common: {
      copyright: '© 2026 SmartCompta AI',
      loading: 'Loading...',
      active: 'Active',
      statuses: {
        all: 'All Status',
        processed: 'Processed',
        pending: 'Pending',
        review: 'Review',
      },
      actions: {
        openWorkspace: 'Open Workspace',
        export: 'Export',
        view: 'View',
        upload: 'Upload',
      },
    },
    layout: {
      admin: {
        subtitle: 'Admin Workspace',
      },
      accountant: {
        workspace: 'Accountant Workspace',
        selectClient: 'Select Client',
      },
    },
    accountantDashboard: {
      title: 'Accounts Dashboard',
      description: 'Your accounting workspace overview',
      stats: {
        totalClients: 'Total Clients',
        pendingDocuments: 'Pending Documents',
        thisMonthExpenses: 'This Month Expenses',
        tvaRecoverable: 'TVA Recoverable',
      },
      clients: {
        title: 'Your Clients',
        labels: {
          ice: 'ICE',
          city: 'City',
        },
        button: 'Open Workspace',
        emptyState: 'No clients assigned yet. Contact your administrator to get started.',
      },
    },
    accountantClients: {
      title: 'Clients',
      description: 'Manage your assigned clients',
      assignedSingle: 'You have 1 client assigned',
      assignedPlural: 'You have {count} clients assigned',
      searchPlaceholder: 'Search by company name, ICE, or activity...',
      activeBadge: 'Active',
      emptyState: {
        title: 'No clients assigned',
        description: 'You don\'t have any clients assigned yet. Contact your administrator.',
      },
      searchEmptyState: 'No clients found matching your search.',
    },
    accountantInvoices: {
      title: 'Documents',
      description: 'Manage invoices and documents',
      actionLabel: 'Upload',
      filters: {
        searchPlaceholder: 'Search supplier or ICE...',
        statusPlaceholder: 'Filter by status',
      },
      columns: {
        supplier: 'Supplier',
        ICE: 'ICE',
        category: 'Category',
        amount: 'Amount',
        date: 'Date',
        status: 'Status',
        actions: 'Actions',
      },
    },
    accountantBank: {
      title: 'Bank Statements',
      description: 'Upload and manage your bank statements',
      tabs: {
        upload: 'Upload',
        statements: 'Extracted Statements',
      },
      uploadTitle: 'Upload Bank Statements',
      howItWorks: 'How it works: Upload your bank statement PDF or image. Our AI will automatically extract the transaction data and populate the table below.',
      columns: {
        date: 'Date',
        description: 'Description',
        type: 'Type',
        debit: 'Debit',
        credit: 'Credit',
        balance: 'Balance',
        status: 'Status',
      },
    },
  },
  fr: {
    // App Name
    appName: 'SmartCompta AI',
    appTagline: 'Traitement Autonome de Factures',

    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      invoiceInbox: 'Boîte de réception',
      outbox: 'Boîte d\'envoie',
      suppliers: 'Fournisseurs',
      reports: 'Rapports',
      settings: 'Paramètres',
      accountants: 'Comptables',
      clients: 'Clients',
      documents: 'Documents',
      bank: 'Banque',
      adminPanel: 'Panneau Admin',
    },

    // Header
    header: {
      searchPlaceholder: 'Rechercher des factures, fournisseurs...',
      admin: 'Administrateur',
      logout: 'Déconnexion',
    },

    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      subtitle: 'Aperçu de vos opérations comptables',
      kpis: {
        monthlySpend: 'Dépenses Mensuelles Totales',
        pendingInvoices: 'Factures en Attente',
        vatRecovery: 'Récupération TVA Estimée',
        invoices: 'factures',
        fromLastWeek: 'depuis la semaine dernière',
      },
      upload: {
        title: 'Téléchargement Magique IA',
        processing: 'Traitement de la facture avec IA...',
        extracting: 'Extraction et validation des données',
        dragDrop: 'Glisser-Déposer les Fichiers de Facture',
        description: 'Téléchargez des fichiers PDF, JPG ou PNG. Notre IA extraira automatiquement les informations du fournisseur, les montants, la TVA et les numéros ICE.',
        browse: 'Parcourir les Fichiers',
      },
      recentActivity: {
        title: 'Activité Récente',
        processed: 'Traité',
        pending: 'En attente',
      },
    },

    // Invoice Inbox
    invoiceInbox: {
      title: 'Boîte de Réception des Factures',
      subtitle: 'Gérer et examiner toutes les factures',
      exportSelected: 'Exporter la Sélection',
      searchPlaceholder: 'Rechercher par fournisseur ou numéro ICE...',
      filters: {
        allStatus: 'Tous les Statuts',
        processed: 'Traité',
        pending: 'En attente',
        review: 'Révision',
        dateRange: 'Plage de Dates',
      },
      table: {
        preview: 'Aperçu',
        supplier: 'Nom du Fournisseur',
        ice: 'Numéro ICE',
        date: 'Date',
        totalTTC: 'Total TTC (MAD)',
        category: 'Catégorie',
        status: 'Statut',
      },
      noInvoices: 'Aucune facture trouvée correspondant à vos critères',
      showing: 'Affichage de',
      of: 'sur',
      invoices: 'factures',
      selected: 'sélectionné(s)',
    },

    // Invoice Editor
    invoiceEditor: {
      title: 'Éditeur de Facture',
      invoice: 'Facture',
      backToInbox: 'Retour à la Boîte',
      preview: {
        title: 'Aperçu de la Facture',
        date: 'Date',
        invoiceNumber: 'Facture n°',
        ice: 'Numéro ICE',
        items: 'Articles',
        ht: 'Montant HT',
        tva: 'TVA 20%',
        ttc: 'Total TTC',
        aiDetected: 'Les surlignages verts indiquent les champs détectés par IA',
      },
      form: {
        title: 'Détails de la Facture',
        supplier: 'Nom du Fournisseur',
        ice: 'Numéro ICE',
        date: 'Date de la Facture',
        ht: 'Montant HT',
        tva: 'TVA 20%',
        ttc: 'Total TTC',
        category: 'Catégorie',
        confirmSave: 'Confirmer et Enregistrer',
        flagError: 'Signaler une Erreur',
        saved: 'Facture enregistrée avec succès ! Redirection...',
      },
    },

    // Supplier Directory
    suppliers: {
      title: 'Répertoire des Fournisseurs',
      subtitle: 'Gérer vos relations fournisseurs',
      addSupplier: 'Ajouter un Fournisseur',
      searchPlaceholder: 'Rechercher par nom ou numéro ICE...',
      totalSpentYTD: 'Total Dépensé (Année)',
      defaultCategory: 'Catégorie par Défaut',
      summary: {
        totalSuppliers: 'Total Fournisseurs',
        totalSpend: 'Dépenses Totales (Année)',
        activeCategories: 'Catégories Actives',
      },
    },

    // Reports
    reports: {
      title: 'Rapports',
      subtitle: 'Analyses et statistiques financières',
      export: {
        title: 'Options d\'Exportation',
        excel: 'Exporter vers Excel',
        pdf: 'Exporter vers PDF',
        sage: 'Synchroniser avec Sage',
        quickbooks: 'Synchroniser avec QuickBooks',
      },
      monthlySpending: {
        title: 'Dépenses Mensuelles',
        subtitle: 'Comparaison depuis le début de l\'année',
        download: 'Télécharger',
      },
      vatBreakdown: {
        title: 'Répartition de la TVA',
        subtitle: 'Montants collectés vs récupérables',
        totalCollected: 'Total TVA Collectée',
        totalRecoverable: 'Total TVA Récupérable',
        table: {
          category: 'Catégorie',
          collected: 'TVA Collectée (MAD)',
          recoverable: 'TVA Récupérable (MAD)',
          recoveryRate: 'Taux de Récupération',
          total: 'Total',
        },
      },
    },

    // Settings
    settings: {
      title: 'Paramètres',
      subtitle: 'Gérer votre compte et préférences',
      profile: {
        title: 'Paramètres du Profil',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Adresse E-mail',
        phone: 'Numéro de Téléphone',
      },
      company: {
        title: 'Informations de l\'Entreprise',
        name: 'Nom de l\'Entreprise',
        ice: 'ICE de l\'Entreprise',
        address: 'Adresse',
      },
      notifications: {
        title: 'Notifications',
        email: {
          title: 'Notifications par E-mail',
          description: 'Recevoir des alertes e-mail pour les nouvelles factures',
        },
        processing: {
          title: 'Alertes de Traitement',
          description: 'Notifier lorsque l\'IA termine le traitement',
        },
        weekly: {
          title: 'Rapports Hebdomadaires',
          description: 'Recevoir un résumé hebdomadaire par e-mail',
        },
      },
      security: {
        title: 'Sécurité',
        changePassword: 'Changer le Mot de Passe',
        twoFactor: {
          title: 'Authentification à Deux Facteurs',
          description: 'Ajouter une couche de sécurité supplémentaire',
          enable: 'Activer',
        },
      },
      saveChanges: 'Enregistrer les Modifications',
    },

    // Categories
    categories: {
      fuel: 'Carburant',
      telecom: 'Télécom',
      utilities: 'Services Publics',
      supplies: 'Fournitures',
      rent: 'Loyer',
      meals: 'Repas',
      itEquipment: 'Équipement IT',
      shipping: 'Expédition',
    },

    // Common
    common: {
      copyright: '© 2026 SmartCompta AI',
      loading: 'Chargement...',
      active: 'Actif',
      statuses: {
        all: 'Tous les statuts',
        processed: 'Traité',
        pending: 'En attente',
        review: 'Révision',
      },
      actions: {
        openWorkspace: 'Ouvrir l\'espace',
        export: 'Exporter',
        view: 'Voir',
        upload: 'Téléverser',
      },
    },
    layout: {
      admin: {
        subtitle: 'Espace Admin',
      },
      accountant: {
        workspace: 'Espace Comptable',
        selectClient: 'Sélectionner un client',
      },
    },
    accountantDashboard: {
      title: 'Tableau de bord',
      description: 'Vue d’ensemble de votre espace comptable',
      stats: {
        totalClients: 'Total des clients',
        pendingDocuments: 'Documents en attente',
        thisMonthExpenses: 'Dépenses du mois',
        tvaRecoverable: 'TVA récupérable',
      },
      clients: {
        title: 'Vos clients',
        labels: {
          ice: 'ICE',
          city: 'Ville',
        },
        button: 'Ouvrir l’espace',
        emptyState: 'Aucun client assigné pour le moment. Contactez votre administrateur pour démarrer.',
      },
    },
    accountantClients: {
      title: 'Clients',
      description: 'Gérez vos clients assignés',
      assignedSingle: 'Vous avez 1 client assigné',
      assignedPlural: 'Vous avez {count} clients assignés',
      searchPlaceholder: 'Rechercher par nom, ICE ou activité...',
      activeBadge: 'Actif',
      emptyState: {
        title: 'Aucun client assigné',
        description: 'Vous n\'avez aucun client assigné pour le moment. Contactez votre administrateur.',
      },
      searchEmptyState: 'Aucun client trouvé correspondant à votre recherche.',
    },
    accountantInvoices: {
      title: 'Documents',
      description: 'Gérez les factures et documents',
      actionLabel: 'Téléverser',
      filters: {
        searchPlaceholder: 'Rechercher un fournisseur ou ICE...',
        statusPlaceholder: 'Filtrer par statut',
      },
      columns: {
        supplier: 'Fournisseur',
        ICE: 'ICE',
        category: 'Catégorie',
        amount: 'Montant',
        date: 'Date',
        status: 'Statut',
        actions: 'Actions',
      },
    },
    accountantBank: {
      title: 'Relevés bancaires',
      description: 'Téléversez et gérez vos relevés bancaires',
      tabs: {
        upload: 'Téléverser',
        statements: 'Relevés extraits',
      },
      uploadTitle: 'Téléversez les relevés bancaires',
      howItWorks: 'Comment ça marche : téléversez votre relevé bancaire PDF ou image. Notre IA extrait automatiquement les données de transaction et remplit le tableau ci-dessous.',
      columns: {
        date: 'Date',
        description: 'Description',
        type: 'Type',
        debit: 'Débit',
        credit: 'Crédit',
        balance: 'Solde',
        status: 'Statut',
      },
    },
  },
};

export const translations = {
  ...baseTranslations,
  ar: baseTranslations.en,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof baseTranslations.en;
