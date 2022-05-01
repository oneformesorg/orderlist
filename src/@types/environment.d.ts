export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      MAIL_USER: string
      MAIL_PASS: string
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
      RECAPTCHA_BACKEND_KEY: string
    }
  }
}