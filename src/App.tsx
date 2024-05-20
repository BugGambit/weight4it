import AuthWrapper from "./AuthWrapper";
import Layout from "./Layout";
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <Layout>
      <AuthWrapper>
        <LandingPage />
      </AuthWrapper>
    </Layout>
  );
}
