import UnitList from '@/components/units/list';
import useUnitsManager from '@/managers/unit/manager';
import { useEffect } from 'react';

export default function UnitPage() {
  const { fetchUnits, flags } = useUnitsManager();

  useEffect(() => {
    if (flags.isLoading) {
      fetchUnits();
    }
  }, [fetchUnits, flags.isLoading]);

  return <>{flags.isSuccess && <UnitList />}</>;
}
