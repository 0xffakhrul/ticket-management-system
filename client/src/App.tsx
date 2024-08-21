import {
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="max-w-7xl bg-gray-100">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Toaster />
    </div>
  );
}

export default App;
