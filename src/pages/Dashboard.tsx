import { Layout } from '@/components/layout/Layout';
import { DevocionalCard } from '@/components/DevocionalCard';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Layout headerTitle="Devoc365">
      <div className="py-4 space-y-6">
        <DevocionalCard />
        
        <div className="px-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/historial')}
          >
            <History className="w-4 h-4" />
            {t('devotional.viewPrevious')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
