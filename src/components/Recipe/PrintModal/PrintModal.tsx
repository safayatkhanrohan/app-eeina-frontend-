
import * as Dialog from "@radix-ui/react-dialog";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ListIcon, Utensils } from "lucide-react";
import PrintCard from "./PrintCard";
import { QRCodeSVG } from "qrcode.react";
import{ useRef } from "react";
import { useReactToPrint } from "react-to-print";
interface PrintModalProps {
    open: boolean;
    onClose: () => void;
    recipe: any;
}

const PrintModal: React.FC<PrintModalProps> = ({ open, onClose, recipe }) => {

    const { language } = useLanguage();
    const currentUrl = window.location.href;
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint =useReactToPrint({
         contentRef: printRef,
        documentTitle: recipe.title[language] || recipe.title.en, 
        });
    console.log("rec", recipe.instructions)

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className=" fixed inset-0 bg-gray-50" />

                <Dialog.Content className="fixed inset-0 z-50 bg-[#F1F8E9] overflow-auto">

                    <div className="flex justify-between items-center p-4 border-b">
                          <button
                            onClick={handlePrint}
                            className="rounded-md bg-[#558B2F] px-4 py-2 text-white hover:bg-[#457026] text-base font-semibold"
                        >
                            {language=="ar"?"طباعة":"Print"}
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-900 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                    <div ref={printRef} className="w-[700px] max-w-7xl mx-auto text-center  bg-[#F1F8E9] min-h-screen px-6 py-10 relative">
                        <div>
                            <h1 className="mb-4 text-[#558B2F] text-3xl font-semibold">{recipe.title[language] || recipe.title.en}</h1>
                            <img className=" w-full max-w-[600px] h-72 md:h-80 object-cover rounded-xl shadow-lg mx-auto mb-6" src={recipe?.thumbnail?.url} alt={recipe.title[language] || recipe.title.en} />
                            <p className="mt-4 text-lg text-[#555]">{recipe.description[language] || recipe.description.en}</p>
                        </div>
                        <PrintCard
                            title={language === "ar" ? "المكونات" : "Ingredients"}
                            icon={<Utensils className="w-6 h-6 text-[#558B2F]" />}
                        >
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ing: any, i: number) => (
                                    <li
                                        key={i}
                                        className="text-start pl-4 relative before:content-['•'] before:absolute before:left-0
                                         before:text-[#558B2F] before:text-lg
                                         text-base
                                         "
                                    >
                                        {`(${ing.quantity}) ${ing.rawIngr[language] || ing.rawIngr.en}`}


                                    </li>
                                ))}
                            </ul>
                        </PrintCard>
                        <PrintCard
                            title={language === "ar" ? "تعليمات الطبخ" : "Instructions"}
                            icon={<ListIcon className="w-6 h-6 text-[#558B2F]" />}
                        >
                            <div>
                                {recipe.instructions.map((instruction: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between gap-4 text-start mb-4"
                                    >
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="bg-[#558B2F] flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-white font-bold">
                                                {i + 1}
                                            </div>
                                            <div className="capitalize text-base leading-relaxed">
                                                {instruction.step[language] || instruction.step.en}
                                            </div>
                                        </div>

                                        {instruction.image && (
                                            <div className="w-36 h-36 flex-shrink-0">
                                                <img
                                                    className="rounded-lg w-full h-full object-cover"
                                                    src={instruction.image.url}
                                                    alt={instruction.step.en}
                                                />
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>


                        </PrintCard>
                        <PrintCard
                            title={language === "ar" ? " البحث عن المزيد" : "Scan for More!"}
                           
                        >
                           <div className="flex items-center justify-between gap-4 text-start mb-4">
                            <div className="relative inline-block">
                           <QRCodeSVG
                              value={currentUrl}
                              size={200}
                              level="H"
                              includeMargin={true}
                              bgColor="#ffffff"
                              fgColor="#000000"
                             
                           />
                           <img
                              src="https://dev.eeina.com/EEINA_BBg-01.png"
                              alt="logo"
                              className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow"
                           />
                        </div>
                        <p className="capitalize text-base leading-relaxed">{language=="ar"?"قم بمسح رمز الاستجابة السريعة هذا للوصول إلى النسخة الرقمية من هذه الوصفة، بما في ذلك فيديو تعليمي، ومعلومات غذائية، وخيارات مختلفة لتجربتها!"
                        :"Scan this QR code to access the digital version of this recipe, including a video tutorial, nutritional information, and variations to try!"}</p>
                        
                           </div>
                        </PrintCard>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default PrintModal;
