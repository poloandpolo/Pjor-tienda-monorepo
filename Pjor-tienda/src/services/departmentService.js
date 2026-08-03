import { apiFetch } from './api';


export const getDepartmentMenu = async(department)=>{
  return await apiFetch(
    `/api/departments/${department}/menu`
  );
};