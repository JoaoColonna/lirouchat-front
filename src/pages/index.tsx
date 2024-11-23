import Link from 'next/link';
import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-10">Bem vindo!</h1>
        {isAuthenticated ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/avaliations">
              <div className="w-full p-6 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors cursor-pointer">
                <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
                <p className="text-lg">Veja e gerencie suas avaliações.</p>
              </div>
            </Link>
            <Link href="/chatbot">
              <div className="w-full p-6 bg-complementary text-white rounded-lg shadow-lg hover:bg-complementary/90 transition-colors cursor-pointer">
                <h2 className="text-2xl font-semibold mb-4">Conversas</h2>
                <p className="text-lg">Acesse suas conversas e mensagens.</p>
              </div>
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <div className="w-full p-6 bg-analogous1 text-white rounded-lg shadow-lg hover:bg-analogous1/90 transition-colors cursor-pointer">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <p className="text-lg">Faça login para acessar suas avaliações e conversas.</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;