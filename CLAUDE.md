# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a React-based campaign website for Juan Pablo Melinao González's 2026 Chilean presidential campaign. The site features a modern, responsive design with advanced animations and SEO optimization for political content.

### Campaign Context

**Candidate Profile**: Juan Pablo Melinao González is an ingeniero en informática, emprendedor mapuche, and independent presidential candidate who combines technological innovation with social justice and national unity.

**Central Narrative**: 
- **Slogan**: "Tecnología para Todos, Unidad para Chile"
- **Message**: As a Mapuche engineer, combines technological innovation with commitment to equity and unity
- **Primary Domain**: https://melinao2026.cl/ - official campaign website
- **Secondary Domain**: https://chiledigno.cl/ - alternative domain for broader reach

**Key Statistics**:
- 70% of Chileans seek economic relief (Cadem 2025)
- 90% perceive insecurity (ENUSC 2022)
- 10% indigenous population potential connection
- 40% young voters targeted demographic

### Strategic Positioning

The site needs to differentiate from the existing "Chile Digno" movement (a left-wing coalition with Marxist-Leninist ideology) while leveraging the domain name's resonance with Chilean equity aspirations.

## Key Directories Structure

```
/root/application/
├── presidente-2026/          # Main React application
│   ├── src/
│   │   ├── App.js           # Main application component with all sections
│   │   ├── components/      # Reusable components
│   │   │   └── SEOWrapper.js # SEO configuration wrapper
│   │   ├── data/
│   │   │   └── seoConfigs.js # SEO metadata configurations
│   │   ├── hooks/
│   │   │   └── useSEO.js    # Custom hook for SEO management
│   │   └── index.js         # React app entry point
│   ├── public/
│   │   └── index.html       # HTML template with Tailwind CDN
│   ├── package.json         # Dependencies and scripts
│   └── webhook.js           # GitHub webhook handler for auto-deployment
├── backup_hostinger/        # Express.js backup/legacy code
├── deploy.sh               # Automated deployment script
└── CLAUDE.md              # This file
```

## Common Development Commands

### Main React Application (presidente-2026/)
```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Serve production build locally
npm run serve
```

### Deployment System
```bash
# Manual deployment (runs git pull, build, and deploy)
./deploy.sh

# Start webhook server for auto-deployment
node webhook.js
```

## Architecture Details

### Frontend Stack
- **React 19** with functional components and hooks
- **Tailwind CSS** via CDN for styling
- **Lucide React** for modern icons
- **React Router DOM** for navigation (though currently single-page)
- **Custom SEO system** with hooks and meta management

### Component Architecture
- **Single-file application**: All components defined in `App.js`
- **Modular sections**: Hero, Vision, Reforms, Impact, History, Call-to-Action
- **Responsive design**: Mobile-first approach with extensive breakpoint handling
- **Animation system**: Parallax effects, mouse tracking, and micro-interactions

### SEO System
- **Custom hook**: `useSEO` for dynamic meta tag management
- **Structured data**: Schema.org markup for political content
- **Social media**: Open Graph and Twitter Card optimization
- **Political metadata**: Chile-specific geo and political tags

### Deployment Pipeline
- **GitHub webhook**: Automated deployment on main branch push
- **PM2 process management**: Zero-downtime deployments
- **Nginx reverse proxy**: Production web server setup
- **Build optimization**: Production builds copied to `/var/www/melinao2026/`

## Key Configuration Files

- `package.json`: React app dependencies and scripts
- `webhook.js`: GitHub webhook listener on port 7777
- `deploy.sh`: Complete deployment automation script
- `src/data/seoConfigs.js`: SEO metadata for different page sections

## Development Notes

### Styling Approach
- Uses Tailwind CSS classes extensively
- Custom gradient backgrounds and animations
- Responsive grid systems (1-column mobile, multi-column desktop)
- Advanced CSS effects like backdrop-blur and complex gradients

### Component Patterns
- Functional components with hooks (useState, useEffect)
- Event-driven interactions (scroll tracking, mouse movement)
- Dynamic styling based on scroll position and user interaction
- Extensive use of conditional rendering and animation states

### SEO Considerations
- Dynamic title and meta tag updates
- Political campaign-specific schema markup
- Chilean geo-targeting and political metadata
- Social media optimization for campaign content

## Testing and Quality Assurance

Currently no automated testing framework is configured. The project relies on:
- Manual testing during development
- Production build verification in deployment script
- PM2 process monitoring for runtime issues

## Security Notes

⚠️ **IMPORTANT**: The webhook.js file contains a hardcoded GitHub webhook secret. This should be moved to environment variables for production security.

## Performance Considerations

- Tailwind CSS loaded via CDN (consider bundling for production)
- Large single-component architecture (consider code splitting for scale)
- Extensive animations may impact performance on lower-end devices
- SEO metadata updates happen on every component render

## Campaign Strategy & Reform Proposals

### Core Reform Areas

#### A. Technological Reforms: IA Automation
- **Objective**: Optimize state processes (Registro Civil, SII, notarías) with AI
- **Key Actions**:
  - Unified Digital Platform for centralized procedures
  - Pilot projects with Registro Civil and SII
  - Cybersecurity alliance with Armed Forces
  - Public employee retraining programs
- **Expected Results**: 50% reduction in procedure times, $500 billion annual savings
- **Timeline**: 2-year initial phase, 5-year expansion
- **Financing**: $0.5-1 trillion initial investment, ROI in 2-3 years

#### B. Economic Reforms: Tax Reduction & Formalization
- **Objective**: Reduce cost of living, increase purchasing power, formalize economy
- **Key Actions**:
  - IVA reduction: 5% basic basket, 10% other goods
  - Minimum wage: $900k with SME subsidies
  - Mandatory electronic invoicing
  - 50% tax on salaries over $3 million
- **Expected Results**: 5-10% price reduction, formal job creation
- **Financing**: High salary taxes ($1.5-2 trillion), luxury IVA (20%)

#### C. Security Reforms: Borders & Migration
- **Objective**: Strengthen national security, control illegal migration
- **Key Actions**:
  - Drone and satellite technology on northern borders
  - International agreements with Bolivia and Peru
  - Humanitarian detention centers
  - Social programs in vulnerable areas
- **Expected Results**: 50% reduction in illegal migration, 20% reduction in violent crimes
- **Financing**: Defense budget (1.5% GDP), automation savings

#### D. Social Reforms: Justice & Equity
- **Objective**: Address historical debts, eliminate political privileges
- **Key Actions**:
  - Teacher historical debt: $4.5 million to 57,000 teachers
  - Teacher salary: $900k with rural bonuses
  - Gradual elimination of lifetime salaries
  - Investment in health and education in vulnerable areas
- **Timeline**: 6-year historical debt payment, 5-year lifetime salary elimination

#### E. National Unity & Indigenous Rights Reforms
- **Objective**: Promote national unity while recognizing Mapuche rights and culture
- **Key Actions**:
  - Cultural recognition in national education
  - Transparent indigenous land titling process
  - $300 billion investment in Araucanía development
  - National Reconciliation Council
- **Financing**: Mining fund ($500 billion), automation savings

### Campaign Timeline (12-Month Strategy)

1. **Months 1-2 (Launch)**: Focus on technology and economy in Santiago/Antofagasta
2. **Months 3-4 (Social Justice)**: Visit La Pintana and street markets, highlight privilege elimination
3. **Months 5-6 (Security)**: Events in Arica and Valparaíso, promote secure borders
4. **Months 7-8 (Education)**: Visit rural schools and universities, emphasize historical debt
5. **Months 9-10 (Araucanía)**: Dialogues in Temuco with Mapuche communities
6. **Months 11-12 (Closing)**: Mass events in Santiago, Concepción, and Araucanía

### Website Optimization Priorities

1. **Differentiation**: Clearly distinguish from "Chile Digno" movement
2. **Personal Story**: Highlight Mapuche engineer identity and unique vision
3. **Interactive Elements**: IA procedure simulators, economic impact calculators
4. **Regional Content**: Specific sections for Araucanía and northern border regions
5. **SEO Strategy**: Target keywords like "Chile", "tecnología", "digno", "mapuche"

### Key Performance Indicators

- **Economic Impact**: $520,000/month family benefit from combined reforms
- **Procedure Times**: 99.9% reduction (weeks to minutes)
- **Fiscal Balance**: $2.3-3.1 trillion covered by wealth tax and high salary taxes
- **Social Impact**: 57,000 teachers benefited, reduced inequality in Araucanía

## Important Development Rules

### Git Commit Guidelines
NEVER include references to Claude or AI in commit messages:
- ❌ "Generated with Claude Code"
- ❌ "Co-Authored-By: Claude"
- ❌ Any mention of Claude, AI, or automated generation

### API Server Management
The project includes a MongoDB-based citizen consultation system:

```bash
# Start API server (port 8000)
cd /root/application/presidente-2026
npm run api

# Start both React and API
npm run dev

# PM2 management (for production)
pm2 start api-server.js --name "melinao-api"
pm2 restart melinao-api
pm2 logs melinao-api
```

### Deployment Process
Always use the established deployment workflow:

```bash
# 1. Work in /root/application/presidente-2026/
cd /root/application/presidente-2026

# 2. Build and test locally
npm run build

# 3. Commit changes (NO Claude references)
git add .
git commit -m "descriptive message without AI references"
git push origin main

# 4. Deploy using the automated script
cd /root/application
./deploy.sh
```

### Citizen Consultation System
- **Component**: `ConsultasCiudadanas.js` - Generic, reusable for all landing pages
- **API**: Express server with MongoDB integration
- **Security**: Rate limiting, CORS, input validation
- **Features**: Auto-categorization, sentiment analysis, regional analytics

### OAuth Authentication System
The project implements a robust OAuth authentication system using Google OAuth 2.0 and JWT tokens:

#### **Authentication Flow**:
1. **OAuth Initiation**: User clicks "Iniciar Sesión" → redirects to Google OAuth
2. **Google Authentication**: User authenticates with Google
3. **JWT Generation**: Server generates JWT token with user data
4. **Token Delivery**: Redirect with token in URL parameter `?token=eyJ...`
5. **Client Storage**: Frontend captures token and stores in localStorage
6. **API Authentication**: All API requests use `Authorization: Bearer <token>`

#### **Key Components**:
- **`AuthStatus.js`**: Handles OAuth flow, token management, and user state
- **`api-server.js`**: JWT generation, verification middleware, OAuth endpoints
- **`Usuario.js`**: MongoDB model for OAuth user management

#### **Security Features**:
- **JWT Expiration**: 7-day token validity
- **Secure Storage**: localStorage-based token storage
- **Multi-domain Support**: Works seamlessly on melinao2026.cl and chiledigno.cl
- **Anti-bot Protection**: Authenticated users only for consultation submissions

#### **API Endpoints**:
```bash
# OAuth flow
GET /api/auth/google                    # Initiate Google OAuth
GET /api/auth/google/callback          # OAuth callback handler
GET /api/auth/user                     # Get current user (requires JWT)

# Session management
DELETE /api/auth/logout                # Client-side logout (remove token)
```

#### **Configuration**:
- **Google OAuth**: Configured in `.env` with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- **JWT Secret**: Configured in `.env` with JWT_SECRET
- **Multi-domain**: Supports both primary and secondary domains automatically

#### **Benefits over Cookie Authentication**:
- ✅ No cross-domain cookie issues
- ✅ No SameSite policy complications
- ✅ Simplified session management
- ✅ Works reliably across all domains
- ✅ Client-controlled authentication state