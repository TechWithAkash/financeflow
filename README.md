# FinanceFlow 💰

> A **modern, professional, and fully responsive** personal finance management application built with Next.js 15, MongoDB, and shadcn/ui components.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Experience beautiful, production-ready UI with comprehensive transaction tracking, budget management, and interactive financial visualizations.**

## 🌟 Live Demo

👉 **[Try FinanceFlow Live](#)** *(Coming Soon)*

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/6366f1/ffffff?text=Dashboard+Overview)

### Transaction Management
![Transactions](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Transaction+Management)

### Budget Analytics
![Analytics](https://via.placeholder.com/800x400/06b6d4/ffffff?text=Budget+Analytics)

## ✨ Features

### 💼 Professional UI/UX
- **Modern Design Language**: Clean, minimal interface with gradient backgrounds
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop
- **Interactive Elements**: Smooth hover effects, micro-interactions, and transitions
- **Floating Action Button**: Quick access to add transactions and manage budgets
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Comprehensive error states and user feedback

### 💰 Transaction Management
- **CRUD Operations**: Add, edit, and delete transactions with validation
- **Smart Forms**: Auto-completion, date pickers, and category selection
- **Bulk Operations**: Filter, sort, and manage multiple transactions
- **Transaction History**: Complete audit trail with timestamps
- **Quick Actions**: Always-visible edit and delete buttons
- **Data Validation**: Client and server-side validation with Zod

### 📊 Budget Management
- **Monthly Budgets**: Set and track budgets by category
- **Budget Alerts**: Real-time notifications for overspending
- **Progress Tracking**: Visual progress bars and percentage indicators
- **Budget Comparison**: Budget vs actual spending analysis
- **Insights**: AI-powered spending insights and recommendations

### 📈 Advanced Analytics
- **Monthly Trends**: Bar charts showing spending patterns over time
- **Category Breakdown**: Interactive pie charts for spending distribution
- **Budget Performance**: Comprehensive budget vs actual comparisons
- **Key Metrics**: Total spending, budget utilization, and transaction counts
- **Export Ready**: Data visualization ready for reports and presentations

### � Visual Design
- **Gradient Cards**: Beautiful gradient backgrounds for key metrics
- **Clean Typography**: Readable fonts and proper text hierarchy
- **Color Psychology**: Strategic use of colors for financial data
- **Borderless Design**: Clean, modern cards without unnecessary borders
- **Consistent Spacing**: Harmonious layout with proper spacing

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with hooks and concurrent features
- **Tailwind CSS** - Utility-first styling framework
- **shadcn/ui** - High-quality, accessible UI components
- **Recharts** - Interactive charts and data visualization
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **MongoDB** - NoSQL database for flexible data storage
- **Zod** - Server-side validation and type safety

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Tailwind CSS v4** - Latest styling framework features

### Key Features
- ✅ **Stage 1**: Transaction CRUD operations
- ✅ **Stage 2**: Category management and data visualization
- ✅ **Stage 3**: Budget management and advanced analytics
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Modern UI**: Professional design with animations
- ✅ **Accessibility**: WCAG 2.1 compliant
- ✅ **Performance**: Optimized for speed and SEO

## � Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/financeflow.git
cd financeflow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

## �📦 Detailed Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financeflow.git
   cd financeflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/financeflow
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/financeflow
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄️ Database Schema

### Transactions Collection
```javascript
{
  _id: ObjectId,
  amount: Number,
  date: Date,
  description: String,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Budgets Collection
```javascript
{
  _id: ObjectId,
  month: String, // "YYYY-MM" format
  category: String,
  amount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create/update budget

### Insights
- `GET /api/insights` - Get financial insights and analytics

## 📱 Components

### Core Components
- **Dashboard** - Main overview with key metrics
- **TransactionList** - List and manage transactions
- **Charts** - Data visualization components
- **TransactionForm** - Add/edit transaction modal
- **BudgetForm** - Set monthly budget modal
- **Navigation** - App navigation

### UI Components
- **Button** - Styled button component
- **Card** - Container component
- **Input** - Form input component
- **Select** - Dropdown component
- **Dialog** - Modal component
- **Label** - Form label component

## 🎨 Supported Categories

The application includes 10 predefined expense categories:

| Category | Icon | Description |
|----------|------|-------------|
| Food & Dining | 🍽️ | Restaurants, groceries, food delivery |
| Transportation | 🚗 | Gas, public transit, ride-sharing |
| Shopping | 🛍️ | Retail purchases, online shopping |
| Entertainment | 🎬 | Movies, games, streaming services |
| Bills & Utilities | 📋 | Rent, electricity, internet, phone |
| Healthcare | 🏥 | Medical expenses, insurance, pharmacy |
| Travel | ✈️ | Flights, hotels, vacation expenses |
| Education | 📚 | Tuition, books, courses, training |
| Personal Care | 💄 | Salon, spa, personal grooming |
| Other | 📦 | Miscellaneous expenses |

## 📊 Analytics & Insights

### Monthly Spending Trends
- **Bar Chart**: Visual representation of spending over the last 6 months
- **Trend Analysis**: Identify spending patterns and seasonal variations
- **Interactive Tooltips**: Detailed breakdown on hover

### Category Distribution
- **Pie Chart**: Percentage breakdown of spending by category
- **Color Coding**: Consistent colors across all visualizations
- **Legend**: Clear category identification

### Budget Performance
- **Progress Bars**: Visual budget utilization indicators
- **Comparison Charts**: Budget vs actual spending
- **Alert System**: Notifications for budget overages

### Key Metrics Dashboard
- **Total Spending**: Current month and all-time totals
- **Budget Utilization**: Percentage of budget used
- **Transaction Count**: Number of transactions recorded
- **Largest Transaction**: Highest single expense
- **Average Transaction**: Mean transaction amount

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string

### Customization
- **Categories**: Edit `lib/validations.js` to modify expense categories
- **Charts**: Customize colors in `components/Charts.js`
- **Styling**: Modify `app/globals.css` for theme customization

## 🚦 Getting Started

### 1. **Add Your First Transaction**
- Click the floating "+" button or "Add Transaction"
- Fill in amount, date, description, and category
- Save to see it appear in your transaction list
- Watch your dashboard metrics update in real-time

### 2. **Set Up Monthly Budgets**
- Navigate to the Dashboard
- Click "Set Budget" button
- Choose month, category, and budget amount
- Monitor your progress with visual indicators

### 3. **Explore Analytics**
- View spending trends in the Charts section
- Analyze category breakdowns with interactive pie charts
- Track budget vs actual spending performance
- Get insights on your financial patterns

### 4. **Customize Your Experience**
- Use filters to find specific transactions
- Sort by date, amount, or category
- Set up budgets for different spending categories
- Monitor alerts for budget overages

## 📱 Application Structure

```
FinanceFlow/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Charts.js         # Data visualization
│   ├── Dashboard.js      # Main dashboard
│   ├── TransactionForm.js # Transaction modal
│   ├── TransactionList.js # Transaction management
│   └── Navigation.js     # App navigation
├── lib/                  # Utilities and validations
└── public/               # Static assets
```

## 🔧 Configuration & Customization

### Environment Variables
```env
# Required
MONGODB_URI=mongodb://localhost:27017/financeflow

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization Options
- **Categories**: Edit `lib/validations.js` to modify expense categories
- **Charts**: Customize colors and styling in `components/Charts.js`
- **Theme**: Modify `app/globals.css` for global theme customization
- **Components**: Extend shadcn/ui components in `components/ui/`

## 🎯 Development Stages

### ✅ Stage 1: Core Transaction Management
- Transaction CRUD operations
- Form validation and error handling
- Basic transaction listing and filtering

### ✅ Stage 2: Enhanced UI and Analytics
- Category management system
- Data visualization with charts
- Improved user interface design

### ✅ Stage 3: Budget Management
- Monthly budget setting and tracking
- Budget vs actual comparisons
- Advanced analytics and insights
- Professional UI polish

## � Performance & Best Practices

### Code Quality
- **ESLint**: Enforced coding standards and best practices
- **Component Structure**: Modular, reusable React components
- **State Management**: Efficient state handling with React hooks
- **API Design**: RESTful API with proper error handling

### Performance Optimizations
- **Next.js 15**: Latest framework with automatic optimizations
- **Image Optimization**: Automatic image compression and lazy loading
- **Code Splitting**: Automatic bundle splitting for faster loads
- **Caching**: Optimized caching strategies for API responses

### Security
- **Input Validation**: Client and server-side validation with Zod
- **Sanitization**: Proper data sanitization and encoding
- **Environment Variables**: Secure configuration management
- **CORS**: Proper cross-origin resource sharing setup

## 🔮 Future Enhancements

### Phase 1: Advanced Features
- [ ] **Recurring Transactions**: Set up automatic recurring expenses
- [ ] **Multiple Currencies**: Support for different currencies with exchange rates
- [ ] **Export Functionality**: Export transactions to CSV/PDF formats
- [ ] **Data Import**: Import transactions from bank statements

### Phase 2: Enhanced Analytics
- [ ] **Advanced Reporting**: Monthly/yearly financial reports
- [ ] **Spending Predictions**: AI-powered spending forecasts
- [ ] **Goal Setting**: Financial goals and savings targets
- [ ] **Notifications**: Email/SMS alerts for important events

### Phase 3: Collaboration & Integration
- [ ] **Multi-user Support**: Family/shared account management
- [ ] **Bank Integration**: Connect with bank APIs for automatic imports
- [ ] **Mobile App**: React Native mobile application
- [ ] **Cloud Sync**: Real-time data synchronization

### Phase 4: Advanced Features
- [ ] **Investment Tracking**: Portfolio management and tracking
- [ ] **Tax Preparation**: Tax-related expense categorization
- [ ] **Financial Planning**: Long-term financial planning tools
- [ ] **API Access**: Public API for third-party integrations

## 🤝 Contributing

We welcome contributions to FinanceFlow! Here's how you can help:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
7. **Push** to the branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Use descriptive commit messages

### Types of Contributions
- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **Features**: Add new functionality
- 📚 **Documentation**: Improve docs and examples
- 🎨 **UI/UX**: Enhance the user interface
- 🚀 **Performance**: Optimize for speed and efficiency

## 🙏 Acknowledgments

Special thanks to the amazing open-source projects that made FinanceFlow possible:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components
- **[Recharts](https://recharts.org/)** - A composable charting library
- **[MongoDB](https://mongodb.com/)** - The database for modern applications
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema declaration library

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ **Commercial Use**: Use in commercial projects
- ✅ **Modification**: Modify the source code
- ✅ **Distribution**: Distribute the software
- ✅ **Private Use**: Use privately
- ❌ **Liability**: No liability for damages
- ❌ **Warranty**: No warranty provided

## 📞 Support & Community

### Getting Help
- 📖 **Documentation**: Check the comprehensive guides above
- 🐛 **Issues**: Report bugs on GitHub Issues
- 💬 **Discussions**: Join GitHub Discussions for questions
- 📧 **Email**: Contact maintainers directly

### Stay Updated
- ⭐ **Star** the repository to show your support
- 👀 **Watch** for updates and new releases
- 🍴 **Fork** to contribute back to the community
- 🔄 **Share** with other developers

---

<div align="center">

**Made with ❤️ by developers, for developers**

### 🌟 Star us on GitHub — it helps a lot!

**[⬆ Back to Top](#financeflow-)**

</div>
