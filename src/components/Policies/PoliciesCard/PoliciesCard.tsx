import { useLanguage } from '../../../contexts/LanguageContext';

export interface PolicyCardItem {
  icon?: JSX.Element;
  title: string;
  subtitle?: string;
  SecTitle?: string;
  bullets?: (string | { section?: string; text?: string; items?: string[] })[];
  extraInfo?: string | { label: string; value: string }[];
  tableTitle?: string;
  tableHeaders?: string[];
  extraTableInfo?: string;
}
export const PoliciesCard = ({
  icon,
  title,
  subtitle,
  SecTitle,
  bullets,
  extraInfo,
  tableHeaders,
  tableTitle,
  extraTableInfo,
}: PolicyCardItem): JSX.Element => {
  const { isRTL } = useLanguage();
  return (
    <div className="flex flex-col items-start gap-4 p-4 sm:p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 text-white bg-primaryColor rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="font-bold  text-xl sm:text-2xl mb-2 hover:text-primaryColor transition-colors leading-snug break-words">
          {title}
        </h2>
      </div>
      {SecTitle && (
        <h2 className="font-semibold  text-base sm:text-lg hover:text-primaryColor transition-colors">
          {SecTitle}
        </h2>
      )}
      {subtitle && (
        <p style={{ whiteSpace: 'pre-line' }} className="text-gray-600 text-base">
          {subtitle}
        </p>
      )}
      {bullets && (
        <ul
          className={`list-disc ${isRTL ? 'pr-2 lg:pr-6' : 'pl-2 lg:pl-6'} space-y-2 text-gray-700`}
        >
          {bullets.map((item, idx) =>
            typeof item === 'string' ? (
              <li style={{ whiteSpace: 'pre-line' }} key={idx}>
                {item}
              </li>
            ) : (
              <li style={{ whiteSpace: 'pre-line' }} key={idx} className="list-none">
                {item.section && <strong className="block mb-1">{item.section}:</strong>}
                {item.text && (
                  <p style={{ whiteSpace: 'pre-line' }} className="text-gray-600 text-base">
                    {item.text}:
                  </p>
                )}
                <ul className={`list-disc mt-1 space-y-1 ${isRTL ? 'pr-6' : 'pl-6'}`}>
                  {item?.items?.map((subItem, subIdx) => (
                    <li style={{ whiteSpace: 'pre-line' }} key={subIdx}>
                      {subItem}
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
      )}
      {extraInfo && Array.isArray(extraInfo) ? (
        <>
          <h3 className="mt-4 font-semibold text-gray-800 text-lg">{tableTitle}</h3>
          <div className="w-full overflow-x-auto">
            <table
              className={`min-w-full border mt-3 text-sm sm:text-base border-collapse ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {tableHeaders && tableHeaders.length > 0 && (
                <thead className="bg-gray-100">
                  <tr>
                    {tableHeaders.map((header, i) => (
                      <th
                        key={i}
                        className={`p-2 ${isRTL ? 'text-right' : 'text-left'} font-bold border`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {extraInfo.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 font-semibold border w-1/3 align-top">{row.label}</td>
                    <td className="p-2 border align-top whitespace-pre-line">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-base">{extraInfo}</p>
      )}
      {extraTableInfo && <p className="text-gray-600 text-base">{extraTableInfo}</p>}
    </div>
  );
};
