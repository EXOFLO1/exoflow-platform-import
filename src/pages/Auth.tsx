import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Zap } from "lucide-react";

const industries = [
  { value: "general", label: "عام", labelEn: "General" },
  { value: "ecommerce", label: "تجارة إلكترونية", labelEn: "E-commerce" },
  { value: "real_estate", label: "عقارات", labelEn: "Real Estate" },
  { value: "healthcare", label: "رعاية صحية", labelEn: "Healthcare" },
  { value: "education", label: "تعليم", labelEn: "Education" },
  { value: "finance", label: "خدمات مالية", labelEn: "Finance" },
  { value: "hospitality", label: "ضيافة", labelEn: "Hospitality" },
];

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regIndustry, setRegIndustry] = useState("general");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        data: {
          full_name: regName,
          company_name: regCompany,
          industry_type: regIndustry,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
      setTab("login");
    }
  };

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <Zap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">ExoFlow</h1>
          <p className="mt-1 text-sm text-muted-foreground">منصة إدارة العمليات الذكية</p>
        </div>

        <Card className="shadow-elevated border-border">
          <CardHeader className="pb-4">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">حساب جديد</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-4">
                <CardTitle className="text-xl">مرحباً بعودتك</CardTitle>
                <CardDescription>أدخل بياناتك لتسجيل الدخول</CardDescription>
                <form onSubmit={handleLogin} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">البريد الإلكتروني</Label>
                    <Input id="login-email" type="email" placeholder="email@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">كلمة المرور</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required dir="ltr" />
                  </div>
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                    {loading ? "جاري التحميل..." : "تسجيل الدخول"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-4">
                <CardTitle className="text-xl">إنشاء حساب جديد</CardTitle>
                <CardDescription>سجّل شركتك في ExoFlow</CardDescription>
                <form onSubmit={handleRegister} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">الاسم الكامل</Label>
                    <Input id="reg-name" placeholder="محمد أحمد" value={regName} onChange={(e) => setRegName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-company">اسم الشركة</Label>
                    <Input id="reg-company" placeholder="شركة المستقبل" value={regCompany} onChange={(e) => setRegCompany(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-industry">نوع النشاط</Label>
                    <Select value={regIndustry} onValueChange={setRegIndustry}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">البريد الإلكتروني</Label>
                    <Input id="reg-email" type="email" placeholder="email@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">كلمة المرور</Label>
                    <Input id="reg-password" type="password" placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required dir="ltr" minLength={6} />
                  </div>
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                    {loading ? "جاري التحميل..." : "إنشاء الحساب"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
