import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface CompanyUser {
  id: string;
  company_id: string;
  role: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  department: string | null;
}

interface Company {
  id: string;
  name: string;
  name_ar: string | null;
  slug: string;
  logo_url: string | null;
  industry_type: string | null;
  onboarding_completed: boolean | null;
  is_active: boolean | null;
}

interface CompanyContextType {
  company: Company | null;
  companyUser: CompanyUser | null;
  loading: boolean;
}

const CompanyContext = createContext<CompanyContextType>({
  company: null,
  companyUser: null,
  loading: true,
});

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyUser, setCompanyUser] = useState<CompanyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompany(null);
      setCompanyUser(null);
      setLoading(false);
      return;
    }

    const fetchCompanyData = async () => {
      try {
        const { data: cuData } = await supabase
          .from("company_users")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .limit(1)
          .maybeSingle();

        if (cuData) {
          setCompanyUser(cuData as CompanyUser);

          const { data: companyData } = await supabase
            .from("companies")
            .select("id, name, name_ar, slug, logo_url, industry_type, onboarding_completed, is_active")
            .eq("id", cuData.company_id)
            .single();

          if (companyData) {
            setCompany(companyData as Company);
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [user]);

  return (
    <CompanyContext.Provider value={{ company, companyUser, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};
