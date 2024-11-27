import { Unit, UnitService } from '@/managers/unit/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';

type UnitApi = {
  fetchUnits: UnitService['fetchUnits'];
  addUnit: UnitService['addUnit'];
  updateUnit: UnitService['updateUnit'];
  deleteUnit: UnitService['deleteUnit'];
};


export default function useUnitApi(): UnitApi {
  const initialUnit: Unit = {
    id: '',
    title: '',
    description: '',
    videos: [],
  };
  
  const fetchUnits: UnitService['fetchUnits'] = async () => {
    const { data, error } = await supabase
      .from('units')
      .select<string, Unit>('*, videos(*)');

    const dataCamelize = data ? data.map((item) => camelize(item)) : [];
    return {
      data: dataCamelize || [],
      flags: {
        isSuccess: !!data && !error,
        isError: !!error,
        isLoading: false,
      },
    };
  };

  const addUnit: UnitService['addUnit'] = async (params) => {
    const { data, error } = await supabase
      .from('units')
      .insert(params)
      .select<string, Unit>('*, videos(*)')
      .single();

    return {
      data: camelize(data) || initialUnit,
      flags: {
        isSuccess: !!data && !error,
        isError: !!error,
        isLoading: false,
      },
    };
  };

  const updateUnit: UnitService['updateUnit'] = async (params) => {
    const { data, error } = await supabase
      .from('units')
      .update(params)
      .eq('id', params.id)
      .select<string, Unit>('*')
      .single();

    return {
      data: camelize(data) || initialUnit,
      flags: {
        isSuccess: !!data && !error,
        isError: !!error,
        isLoading: false,
      },
    };
  };

  const deleteUnit: UnitService['deleteUnit'] = async (id) => {
    const { error } = await supabase.from('units').delete().eq('id', id);
    return {
      isSuccess: !error,
      isError: !!error,
      isLoading: false,
    };
  };
  return {
    fetchUnits,
    addUnit,
    updateUnit,
    deleteUnit,
  };
}
