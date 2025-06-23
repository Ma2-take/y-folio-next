import { User, Mail, Lock } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">新規登録</h1>
          <p className="mt-2 text-gray-600">新しいアカウントを作成します</p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="relative">
            <label htmlFor="username" className="sr-only">ユーザー名</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="ユーザー名"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">メールアドレス</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="メールアドレス"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">パスワード</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="パスワード"
            />
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">パスワード（確認）</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="パスワード（確認）"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              新規登録
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          すでにアカウントをお持ちですか?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; 