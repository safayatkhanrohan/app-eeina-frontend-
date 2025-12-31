import { Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

/**
 * Props interface for the ShoppingItem component
 */
interface ShoppingItemProps {
  /** The shopping list item object */
  item: any;
  /** Current language for localization */
  language: string;
  /** Function to toggle the purchase status of an item */
  toggleItem: (id: string) => void;
  /** Function to remove an item from the shopping list */
  removeItem: (id: string) => void;
  /** Whether this is a custom user-added item */
  isCustom?: boolean;
  /** Whether this component is being rendered for PDF export */
  isPdf?: boolean;
}

/**
 * ShoppingItem component displays individual shopping list items
 * Supports toggling purchase status, removing items, and linking to ingredient details
 * Handles both recipe-generated items and custom user items
 */
export const ShoppingItem = ({
  item,
  language,
  toggleItem,
  removeItem,
  isCustom = false,
  isPdf = false,
}: ShoppingItemProps) => {
  // Check if the item has been purchased
  const purchased = item?.status === 'purchased';
  console.log('it', item);
  return (
    <div
      key={item?._id}
      className={`flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all mb-2 ${
        purchased
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-200 hover:border-primaryColor'
      }`}
    >
      {/* Item details section */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          {/* Item name with conditional styling based on purchase status */}
          {!isCustom && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              {/* Link to ingredient details page */}
              <Link
                to={`/ingredient/${item?.item?.slug[language]}`}
                className="flex items-center gap-2 hover:text-primaryColor transition-colors"
              >
                <img
                  src={item?.item?.image?.url || '/ingrediant.png'}
                  alt={item?.item?.name[language]}
                  className="w-6 h-6 rounded object-cover"
                />
                {/* {item.itemType == 'Ingredient' && <span>From:{item?.recipe?.title[language]}</span>} */}
              </Link>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
            <span
              className={`font-medium break-words ${
                purchased && !isPdf ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {
                isCustom
                  ? item?.name[language] // Custom item name
                  : `${item?.quantity ?? ''} ${item.itemType == 'Ingredient' ? (item?.unit?.[language] ?? '') : ''} ${
                      item?.item?.name[language]?.replace(/-/g, ' ') ||
                      item?.item?.slug.en?.replace(/-/g, ' ')
                    }` // Recipe ingredient with quantity
              }
            </span>
          </div>
        </div>
      </div>
      {/* Purchase status toggle checkbox */}
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
          purchased
            ? 'bg-primaryColor border-primaryColor'
            : 'border-gray-300 hover:border-primaryColor'
        }`}
        onClick={() => toggleItem(item._id)}
      >
        {purchased && <Check className="w-4 h-4 text-white" />}
      </div>
      {/* Action buttons */}

      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item._id)}
          className="text-gray-400 hover:text-red-600 w-8 h-8"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
