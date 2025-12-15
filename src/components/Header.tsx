import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";

export function Header() {
  return (
    <header className="bg-teal-500 py-6 shadow-md">
      <div className="flex flex-col items-center">
        <XVIcon icon={FontAwesomeIconsLibrary.EarthAmericas} className="h-5 w-5 text-white mb-2" />
        <h1 className="text-center text-3xl font-bold text-white">
          Red Social de Post
        </h1>
        <p className="text-center text-gray-100 text-sm mt-2">
          Comparte tus ideas con el mundo
        </p>
      </div>
    </header>
  );
}