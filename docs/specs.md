# Backend
## Dependencies
- electron
- typescript
- sqlite3
- knex
- docxtemplater
- pizzip
- swissqrbill
## Database Types
### Client
- id?: string
- name: string
- address: string
- zip: number
- city: string
- country: string

### Entry
- id?: string
- date: number
- clientID: string
- userID: string
- text: string
- fixedAmount?: number
- invoiceID?: string
- hours: number
- amount?: number

### Invoice
- id: string
- clientID?: string
- userID?: string
- path: string
- extID: string
- amount: number

### Users
- inherit client
- baseWage: number

### Wage
- clientID: string
- userID: string
- amount: number

### Settings
- MWST: number
- clientTemplateFile: string
- runningExportID: number
- entryTextSuggestions: string[]
- companyAddress: string
- companyZip: number
- companyCity: string
- companyCountry: string
- IBAN: string

### ExportParams
- fromDate: number
- toDate: number

### ExportData
- fromDate: string
- toDate: string
- date: string
- entries: Entry[]
- clientName: string
- clientAddress: string // Formatted client.address
- mwst: string
- hoursTotal: number
- fixedTotal: number
- subTotal: number
- mwstTotal: number
- total: number
- invoiceID: string

### QRData
- currency: string
- amount: number
- creditor: { // settings 
	name: string,
	address: string,
	zip: number,
	city: string,
	account: string,
	country: string
}
- debtor { // client
	name: string,
	address: string,
	zip: number,
	country: string
}


## Functions
### Settings
- getSettings
- setSettings(data: Settings)

### Clients
- getClients
- getClientByID(id: string)
- addClient(data: Client)
- setClientByID(data: Client)
- deleteClientByID(id: string)


### Entries
- getEntries
- getEntriesByClientID(id: string)
- getEntriesByUserID(id: string)
- addEntry(data: Entry)
- setEntryByID(data: Entry)
- deleteEntryByID(id: string)

### Users
- getUsers
- getUserByID(id: string)
- addUser(data: User)
- setUserByID(data: User)
- deleteUserByID(id: string)

### Invoices
- getInvoicesByClientID(id: string)
- getInvoicesByUserID(id: string)
- getInvoiceByID(id: string)
- addInvoice(data: Invoice)
- validateInvoices(id: string, isUser=false:boolean)

### Amounts
- getAmountsByUserID(id: string)
- addWage(data: Wage)
- setWage(data: Wage)

### File Handlers
- openFiles(path: string)
- openFolder()
- deleteFiles(path: string)

### Utils
- calculateTable(entries: Entry[], doExport=false)
- formatDate(epoch: number)
- generateID()
- safeRound()

### Exports
- exportClientToFile(data: ExportData)
- writeToFile(data: ExportData, settings: Settings, path: string, isUser=false, qrData: QRData)

# Frontend
## Dependencies
- typescript
- vite
- svelte
- tailwindcss
- smui
- pagejs


# Devops
## Dependencies
- prettier
- eslint
