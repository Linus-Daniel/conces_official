/**
 * Secure logging utility to prevent sensitive data leaks in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogData {
  [key: string]: any;
}

class SecureLogger {
  private sensitiveFields = new Set([
    'password',
    'token',
    'accessToken',
    'refreshToken',
    'authorization',
    'cookie',
    'session',
    'secret',
    'key',
    'apikey',
    'api_key',
    'auth',
    'authentication',
    'credentials',
    'credit_card',
    'creditcard',
    'ssn',
    'social_security',
    'passport',
    'drivers_license',
    'pin',
    'cvv',
    'security_code'
  ]);

  private sanitizeData(data: any, depth = 0): any {
    // Prevent infinite recursion
    if (depth > 5) return '[Max Depth Reached]';
    
    if (data === null || data === undefined) return data;
    
    if (typeof data === 'string') {
      // Check if the string contains sensitive information
      const lowerData = data.toLowerCase();
      if (this.sensitiveFields.has(lowerData) || 
          lowerData.includes('password') || 
          lowerData.includes('token') ||
          lowerData.includes('secret')) {
        return '***REDACTED***';
      }
      return data;
    }
    
    if (typeof data === 'number' || typeof data === 'boolean') {
      return data;
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item, depth + 1));
    }
    
    if (typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase();
        
        // Check if key is sensitive
        if (this.sensitiveFields.has(lowerKey) || 
            lowerKey.includes('password') || 
            lowerKey.includes('token') ||
            lowerKey.includes('secret') ||
            lowerKey.includes('key')) {
          sanitized[key] = '***REDACTED***';
        } else {
          sanitized[key] = this.sanitizeData(value, depth + 1);
        }
      }
      return sanitized;
    }
    
    return data;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogData): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (data) {
      const sanitizedData = this.sanitizeData(data);
      return `${prefix} ${message} | Data: ${JSON.stringify(sanitizedData)}`;
    }
    
    return `${prefix} ${message}`;
  }

  error(message: string, data?: LogData): void {
    const formattedMessage = this.formatMessage('error', message, data);
    console.error(formattedMessage);
  }

  warn(message: string, data?: LogData): void {
    const formattedMessage = this.formatMessage('warn', message, data);
    console.warn(formattedMessage);
  }

  info(message: string, data?: LogData): void {
    // Only log info in development
    if (isDevelopment) {
      const formattedMessage = this.formatMessage('info', message, data);
      console.info(formattedMessage);
    }
  }

  debug(message: string, data?: LogData): void {
    // Only log debug in development
    if (isDevelopment) {
      const formattedMessage = this.formatMessage('debug', message, data);
      console.debug(formattedMessage);
    }
  }

  // Special method for API responses - only logs in development
  apiResponse(message: string, response: any): void {
    if (isDevelopment) {
      // Even in development, sanitize sensitive data from API responses
      const sanitizedResponse = this.sanitizeData(response);
      this.debug(`API Response: ${message}`, { response: sanitizedResponse });
    }
  }

  // Special method for authentication events - always logged but sanitized
  auth(message: string, data?: LogData): void {
    const sanitizedData = this.sanitizeData(data);
    this.info(`AUTH: ${message}`, sanitizedData);
  }

  // Method to safely log user actions without sensitive data
  userAction(userId: string, action: string, metadata?: LogData): void {
    const safeMetadata = this.sanitizeData(metadata);
    this.info(`User Action: ${action}`, { 
      userId: userId.substring(0, 8) + '...', // Partial user ID for privacy
      action,
      metadata: safeMetadata 
    });
  }
}

// Export singleton instance
export const secureLogger = new SecureLogger();

// Export individual methods for easier usage
export const { error, warn, info, debug, apiResponse, auth, userAction } = secureLogger;

// Default export for when importing the whole logger
export default secureLogger;