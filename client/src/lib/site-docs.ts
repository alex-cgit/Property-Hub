export interface FieldDoc {
  name: string;
  type: string;
  description: string;
}

export interface ActionDoc {
  name: string;
  type: string;
  description: string;
}

export interface SectionDoc {
  title: string;
  description?: string;
  fields?: FieldDoc[];
  actions?: ActionDoc[];
}

export interface PageDoc {
  id: string;
  title: string;
  route: string;
  description: string;
  sections: SectionDoc[];
  subpages?: PageDoc[];
}

export const siteDocumentation: PageDoc[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    route: "/dashboard",
    description: "Main overview of portfolio performance and key metrics.",
    sections: [
      {
        title: "Key Metrics",
        description: "High-level performance indicators",
        fields: [
          { name: "Total Properties", type: "Metric Card", description: "Count of properties in the active portfolio" },
          { name: "Occupancy Rate", type: "Metric Card", description: "Percentage of occupied units vs total units" },
          { name: "Maintenance Requests", type: "Metric Card", description: "Count of open maintenance requests" },
          { name: "Monthly Revenue", type: "Metric Card", description: "Total rent collected for the current month" }
        ]
      },
      {
        title: "Recent Activity",
        description: "Timeline of recent system events",
        fields: [
          { name: "Activity List", type: "List", description: "Chronological list of leases signed, requests created, etc." }
        ]
      }
    ]
  },
  {
    id: "properties",
    title: "Properties",
    route: "/properties",
    description: "List of all properties in the portfolio with filtering capabilities.",
    sections: [
      {
        title: "Header Actions",
        actions: [
          { name: "Add Property", type: "Button", description: "Opens modal to add a new property" },
          { name: "Filter by Type", type: "Dropdown", description: "Filter properties by Residential or Commercial" },
          { name: "Search", type: "Input", description: "Search properties by name or address" }
        ]
      },
      {
        title: "Property List",
        fields: [
          { name: "Property Card", type: "Card", description: "Displays property image, name, address, and key stats" },
          { name: "Unit Count", type: "Badge", description: "Number of units in the property" },
          { name: "Occupancy Status", type: "Indicator", description: "Visual indicator of occupancy health" }
        ],
        actions: [
          { name: "View Details", type: "Click", description: "Clicking a property card navigates to Property Details" }
        ]
      }
    ],
    subpages: [
      {
        id: "property-details",
        title: "Property Details",
        route: "/properties/:id",
        description: "Detailed view of a specific property including units, tenants, and maintenance.",
        sections: [
          {
            title: "Overview",
            fields: [
              { name: "Property Stats", type: "Cards", description: "Detailed breakdown of units, occupancy, tasks, and revenue" }
            ],
            actions: [
              { name: "Edit Property", type: "Button", description: "Edit property details" },
              { name: "Financial Report", type: "Button", description: "Generate financial report for this property" }
            ]
          },
          {
            title: "Tabs",
            description: "Navigation within property details",
            actions: [
              { name: "Units", type: "Tab", description: "List of all units" },
              { name: "Tenants", type: "Tab", description: "List of active tenants" },
              { name: "Maintenance", type: "Tab", description: "Maintenance requests for this property" },
              { name: "Financials", type: "Tab", description: "Financial performance and rent roll" }
            ]
          }
        ]
      },
      {
        id: "unit-details",
        title: "Unit Details",
        route: "/properties/:id/units/:unitId",
        description: "Specific information about a single unit.",
        sections: [
          {
            title: "Unit Info",
            fields: [
              { name: "Unit Number", type: "Header", description: "Identifier for the unit" },
              { name: "Status", type: "Badge", description: "Occupied, Vacant, or Maintenance" },
              { name: "Specs", type: "List", description: "Bedrooms, Bathrooms, Size, Rent" }
            ],
            actions: [
              { name: "Edit Unit", type: "Button", description: "Modify unit specifications" },
              { name: "Create Lease", type: "Button", description: "Start lease workflow for this unit" }
            ]
          },
          {
            title: "Tenant Info",
            fields: [
              { name: "Current Tenant", type: "Card", description: "Details of current occupant if any" },
              { name: "Lease Terms", type: "Card", description: "Start date, end date, and rent amount" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tenants",
    title: "Tenants",
    route: "/tenants",
    description: "Directory of all tenants across the portfolio.",
    sections: [
      {
        title: "Filters",
        actions: [
          { name: "Status Filter", type: "Tabs", description: "Filter by All, Active, Past, or Lead" },
          { name: "Property Filter", type: "Dropdown", description: "Filter tenants by specific building" },
          { name: "Search", type: "Input", description: "Search by tenant name or email" }
        ]
      },
      {
        title: "Tenant List",
        fields: [
          { name: "Tenant Name", type: "Column", description: "Name and avatar of tenant" },
          { name: "Property/Unit", type: "Column", description: "Current residence" },
          { name: "Status", type: "Column", description: "Lease status" },
          { name: "Contact", type: "Column", description: "Email and phone icons" },
          { name: "Lease End", type: "Column", description: "Date of lease expiration" }
        ],
        actions: [
          { name: "View Profile", type: "Click/Menu", description: "Navigate to Tenant Details page" },
          { name: "Message", type: "Menu Item", description: "Send message to tenant" },
          { name: "Evict", type: "Menu Item", description: "Start eviction process" }
        ]
      }
    ],
    subpages: [
      {
        id: "tenant-details",
        title: "Tenant Details",
        route: "/tenants/:id",
        description: "Comprehensive profile of a tenant.",
        sections: [
          {
            title: "Profile Header",
            fields: [
              { name: "Avatar", type: "Image", description: "Tenant photo" },
              { name: "Contact Details", type: "List", description: "Email and phone number" },
              { name: "Status", type: "Badge", description: "Current standing" }
            ],
            actions: [
              { name: "Edit Profile", type: "Button", description: "Update tenant information" },
              { name: "Message", type: "Button", description: "Send direct message" }
            ]
          },
          {
            title: "Current Residence",
            fields: [
              { name: "Property Card", type: "Card", description: "Link to current unit and property" },
              { name: "Lease Details", type: "Grid", description: "Rent, deposit, dates" }
            ]
          },
          {
            title: "History",
            fields: [
              { name: "Lease History", type: "Table", description: "Past leases and terms" },
              { name: "Maintenance Requests", type: "Table", description: "Requests submitted by this tenant" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    route: "/maintenance",
    description: "Track and manage maintenance requests and work orders.",
    sections: [
      {
        title: "Request Management",
        actions: [
          { name: "New Request", type: "Button", description: "Open modal to create new ticket" },
          { name: "Filter Status", type: "Tabs", description: "Open, In Progress, Completed" },
          { name: "Filter Type", type: "Dropdown", description: "Maintenance, Inspection, Turnover, etc." }
        ]
      },
      {
        title: "Request List",
        fields: [
          { name: "Priority", type: "Badge", description: "Color-coded priority level" },
          { name: "Status", type: "Icon", description: "Current workflow state" },
          { name: "Details", type: "Text", description: "Title and description" },
          { name: "Location", type: "Text", description: "Property and Unit" }
        ],
        actions: [
          { name: "Update Status", type: "Menu Item", description: "Change request status" },
          { name: "Assign Crew", type: "Menu Item", description: "Assign to vendor or staff" }
        ]
      }
    ]
  },
  {
    id: "financials",
    title: "Financials",
    route: "/financials",
    description: "Financial overview including income, expenses, and rent roll.",
    sections: [
      {
        title: "Overview",
        fields: [
          { name: "Total Revenue", type: "Metric", description: "Total income for period" },
          { name: "Outstanding Rent", type: "Metric", description: "Uncollected rent" },
          { name: "Net Income", type: "Metric", description: "Revenue minus expenses" }
        ]
      },
      {
        title: "Reports",
        actions: [
          { name: "Export Report", type: "Button", description: "Download financial report" },
          { name: "Date Range", type: "Picker", description: "Select reporting period" }
        ]
      }
    ]
  },
  {
    id: "ledger",
    title: "General Ledger",
    route: "/ledger",
    description: "Double-entry accounting system.",
    sections: [
      {
        title: "Journal Entries",
        fields: [
          { name: "Entry Date", type: "Column", description: "Date of transaction" },
          { name: "Accounts", type: "Column", description: "Debited and Credited accounts" },
          { name: "Amounts", type: "Column", description: "Debit and Credit values" }
        ],
        actions: [
          { name: "New Entry", type: "Button", description: "Create manual journal entry" },
          { name: "Record Invoice", type: "Button", description: "Create AP invoice" }
        ]
      },
      {
        title: "Chart of Accounts",
        fields: [
          { name: "Account Code", type: "Column", description: "Unique identifier" },
          { name: "Account Name", type: "Column", description: "Description of account" },
          { name: "Balance", type: "Column", description: "Current running balance" }
        ]
      }
    ]
  },
  {
    id: "settings",
    title: "Configuration",
    route: "/settings",
    description: "System-wide settings and documentation.",
    sections: [
      {
        title: "General Settings",
        fields: [
          { name: "Portfolio Details", type: "Form", description: "Name, Code, Status" },
          { name: "System Preferences", type: "Form", description: "Dark mode, Notifications" }
        ]
      },
      {
        title: "User Management",
        fields: [
          { name: "User List", type: "Table", description: "List of system administrators and staff" }
        ],
        actions: [
          { name: "Add User", type: "Button", description: "Invite new user to system" }
        ]
      },
      {
        title: "Documentation",
        description: "You are here.",
        actions: [
          { name: "Export Markdown", type: "Button", description: "Download full site documentation" }
        ]
      }
    ]
  }
];
