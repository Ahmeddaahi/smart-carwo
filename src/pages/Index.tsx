import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
