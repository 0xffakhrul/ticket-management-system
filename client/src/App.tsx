import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="max-w-7xl bg-gray-100">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
      <Toaster />
    </div>
  );
}

export default App;
