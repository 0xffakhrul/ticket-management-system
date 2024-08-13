import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="max-w-7xl bg-gray-100">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}

export default App;
