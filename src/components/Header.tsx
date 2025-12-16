import { useTranslation } from 'react-i18next';
import { FontAwesomeIconsLibrary } from "@goaigua/goaigua-styles";
import { XVIcon } from "@goaigua/xylem-vue-components/components/icon";

export function Header() {
  const { t } = useTranslation('header');
  
  return (
    <header className="bg-teal-500 py-6 shadow-md">
      <div className="flex flex-col items-center">
        <XVIcon icon={FontAwesomeIconsLibrary.EarthAmericas} className="h-5 w-5 text-white mb-2" />
        <h1 className="text-center text-3xl font-bold text-white">
          {t('title')}
        </h1>
        <p className="text-center text-gray-100 text-sm mt-2">
          {t('subtitle')}
        </p>
      </div>
    </header>
  );
}
