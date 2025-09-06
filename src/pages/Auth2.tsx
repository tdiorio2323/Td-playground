import AuthCardGlass from "../components/AuthCardGlass"; // adjust if you use " @/components/..."

export default function Auth2() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="border-2 border-red-500 p-4">
        <AuthCardGlass />
      </div>
    </div>
  );
}
