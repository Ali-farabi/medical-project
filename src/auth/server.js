import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const GOOGLE_CLIENT_ID =
  "988355939724-jqj1v74hpb4l38s3t60nd60dif6s7q7e.apps.googleusercontent.com";

const error = ref("");
const success = ref("");

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      form
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    success.value = "Logged in!";
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};

const handleGoogleLogin = () => {
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCallback,
  });

  google.accounts.id.prompt();
};

const handleGoogleCallback = async (response) => {
  const idToken = response.credential;

  try {
    const backendRes = await axios.post(
      "http://localhost:8000/api/auth/google",
      { idToken }
    );

    if (backendRes.data.token) {
      localStorage.setItem("token", backendRes.data.token);
    }

    success.value = "Logged in with Google!";
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Google login failed";
  }
};
