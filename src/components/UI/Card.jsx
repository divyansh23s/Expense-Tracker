export default function Card({ children }) {
  return (
    <div  className="bg-white rounded-2xl shadow-lg p-5 mb-6">
      {children}
    </div>
  );
}
