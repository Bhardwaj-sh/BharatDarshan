import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL REACT APP ERROR:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#081D17',
          color: '#FFF',
          padding: '40px',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: '#0C241D',
            padding: '30px',
            borderRadius: '20px',
            border: '2px solid #D2F53E'
          }}>
            <h1 style={{ color: '#D2F53E', margin: '0 0 10px 0', fontSize: '24px' }}>
              Bharat Darshan — Application Notice
            </h1>
            <p style={{ color: '#E2E8F0', fontSize: '14px', lineHeight: '1.6' }}>
              A client runtime exception occurred:
            </p>
            <pre style={{
              backgroundColor: '#061510',
              color: '#F87171',
              padding: '15px',
              borderRadius: '10px',
              overflow: 'auto',
              fontSize: '12px',
              margin: '15px 0'
            }}>
              {this.state.error?.toString()}
              {'\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                backgroundColor: '#D2F53E',
                color: '#061510',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reset Session & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
