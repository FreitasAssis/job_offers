# Job Offers Platform - Conselho Comunitário do Jardim Aeroporto

## About
This is a web platform developed for the Community Council of Jardim Aeroporto to connect local residents with job opportunities. The platform features job listings, community information, and contact details.

## Features
- 📋 Job listings with detailed information
- 🏢 Community council presentation
- 📱 Contact information with social media integration
- 🔍 Job search and filtering capabilities
- 📄 Easy job application system
- 📱 Fully responsive design

## Technology Stack
- React.js
- Google Sheets (as backend database)
- XLSX for spreadsheet handling
- React Icons
- CSS3 for styling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-offers-site.git
cd job-offers-site
```

2. Install dependencies:
```bash
npm install
```

3. Create a Google Sheets document with the following sheets:
   - `Vagas` (Job listings)
   - `Sobre` (About information)
   - `Serviços` (Services)
   - `Contatos` (Contact information)

4. Update the Google Sheets URL in `/src/utils/Functions.js`

5. Start the development server:
```bash
npm start
```

## Google Sheets Structure

### Vagas (Jobs)
| Job Title   | Company      | Location | Salary | Email             | Image     |
| ----------- | ------------ | -------- | ------ | ----------------- | --------- |
| Example Job | Company Name | Location | R$ XXX | email@example.com | image_url |

### Contatos (Contacts)
| Tipo      | Valor           | Link                          |
| --------- | --------------- | ----------------------------- |
| WhatsApp  | (11) 99999-9999 | https://wa.me/5511999999999   |
| Instagram | @example        | https://instagram.com/example |

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Setup
- Node.js >= 14.x
- npm >= 6.x
- Modern web browser

## Acknowledgments
- React.js community
- Google Sheets API
- React Icons library
- Community Council volunteers

---
Made with ❤️ for Jardim Aeroporto Community