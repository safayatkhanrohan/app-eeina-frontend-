import { useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Download,
  Trash2,
  Share2,
  Plus,
  Import,
  ShoppingCartIcon,
} from 'lucide-react';
import {
  useAddCustomItemMutation,
  useAddItemMutation,
  useClearPurchasedItemsMutation,
  useDeleteUserItemMutation,
  useGetSingleListQuery,
  useUpdateItemStatusMutation,
} from '@/redux/Features/Shopping List/ShoppingListApi';
import Loader from '@/components/ui/Loader';
import { toast } from 'sonner';
import { ShoppingItem } from '@/components/ShoppingListItem/ShoppingListItem';
import { exportPDF } from '@/lib/pdfExport';
import { ShareListModal } from './components/ShareListModal';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/hooks/hook';
import { FormattedListItem, RawListItem } from '@/types/listDetails.types';
import LocationModal from './components/LocationModal';
import ChooseStoreModal from './components/ChooseStoreModal';
import { useEditProfileMutation } from '@/redux/Features/User/userApi';
import { LocationType } from '@/schemas/auth/Loaction.validtion';
import GroupingSelect from '@/components/ShoppingListItem/GroupingSelect';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

export const ListDetails = (): JSX.Element => {
  const { id: listId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const token = searchParams.get('token');
  const user = useAppSelector((state) => state.auth.user);
  console.log('user', user);
  const [newItemText, setNewItemText] = useState('');
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoccationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isChoseStoreModalOpen, setIsChooseStoreModalOpen] = useState(false);
  const [editProfile] = useEditProfileMutation();
  const [groupBy, setGroupBy] = useState<'aisle' | 'recipe'>('recipe');

  const { data, isLoading, error } = useGetSingleListQuery({
    id: listId!,
    token: token || undefined,
  });
  const [deleteItem] = useDeleteUserItemMutation();
  const [updateItemStatus] = useUpdateItemStatusMutation();
  const [addCustomItem] = useAddCustomItemMutation();
  const [clearPurchasedItems] = useClearPurchasedItemsMutation();
  const [importList] = useAddItemMutation();

  const listData = data?.data || {};
  const userListsItems = listData.items || [];
  const userListsCustomItems = listData.customItems || [];

  const pendingItems = [
    ...userListsItems.filter((item: any) => item.status !== 'purchased'),
    ...userListsCustomItems.filter((item: any) => item.status !== 'purchased'),
  ];
  const RecipeItems = [...userListsItems.filter((item: any) => item.status !== 'purchased')];
  const CustomItems = [...userListsCustomItems.filter((item: any) => item.status !== 'purchased')];

  const purchasedItems = [
    ...userListsItems.filter((item: any) => item.status === 'purchased'),
    ...userListsCustomItems.filter((item: any) => item.status === 'purchased'),
  ];

  const totalCount = userListsItems.length + userListsCustomItems.length;
  const purchasedCount = purchasedItems.length;
  const completionPercentage = totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0;

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    setIsPdf(true);
    const header = document.createElement('h3');
    header.textContent = t.shopping_list.your_items;
    header.className = 'text-lg sm:text-xl font-bold text-gray-900 mb-4';
    pdfRef.current.insertBefore(header, pdfRef.current.firstChild);

    const imgs = pdfRef.current.querySelectorAll('img');
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
      ),
    );

    await exportPDF(pdfRef.current, `${listData.name || 'Shopping-List'}.pdf`);
    header.remove();
    setIsPdf(false);
  };

  const toggleItem = async (id: string) => {
    try {
      const allItems = [...userListsItems, ...userListsCustomItems];
      const currentItem = allItems.find((item) => item._id === id);
      const newStatus = currentItem?.status === 'purchased' ? 'pending' : 'purchased';
      updateItemStatus({
        listId,
        itemId: id,
        status: newStatus,
        token: token || undefined,
      }).unwrap();
    } catch {
      console.log('Error updating item status');
    }
  };

  const removeItem = async (id: string) => {
    if (!id) return;
    if (!window.confirm(t.shopping_list.confirm_delete_item)) return;

    try {
      await deleteItem({ listId, itemId: id, token: token || undefined }).unwrap();
      toast.success(t.shopping_list.item_deleted_success);
    } catch (error: any) {
      toast.error(error?.data?.message || t.shopping_list.delete_item_failed);
    }
  };

  const addNewItem = async () => {
    if (!newItemText.trim()) {
      toast.error(t.shopping_list.enter_item_text);
      return;
    }
    try {
      const body = {
        name: { en: newItemText, ar: newItemText },
        listId,
        token: token || undefined,
      };
      const res = await addCustomItem(body).unwrap();
      toast.success(res.message);
      setNewItemText('');
    } catch (error: any) {
      toast.error(error?.data?.message || t.shopping_list.add_item_failed);
    }
  };

  const handleClearPurchasedItems = async () => {
    if (purchasedItems.length === 0) {
      toast.info(t.shopping_list.no_purchased_to_clear);
      return;
    }

    if (
      !window.confirm(
        t.shopping_list.confirm_clear_purchased.replace(
          '{count}',
          purchasedItems.length.toString(),
        ),
      )
    )
      return;

    try {
      await clearPurchasedItems({ listId, token: token || undefined }).unwrap();
      toast.success(t.shopping_list.purchased_cleared_success);
    } catch (error: any) {
      toast.error(error?.data?.message || t.shopping_list.clear_purchased_failed);
    }
  };
  const getItemCategory = (item: any, language: string) => {
    return (
      item.item?.category?.[language] ||
      item.item?.category?.en ||
      item.item?.category?.ar ||
      t.shopping_list.uncategorized
    );
  };
  const getCategoryStats = () => {
    const allItems = [...userListsItems, ...userListsCustomItems];
    const stats: Record<string, { total: number; completed: number }> = {};
    allItems.forEach((item: any) => {
      const category = getItemCategory(item, language);
      if (!stats[category]) stats[category] = { total: 0, completed: 0 };
      stats[category].total++;
      if (item.status === 'purchased') stats[category].completed++;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  const getItemDisplayName = (item: any) => {
    const name = item.item?.name?.[language] || item.item?.name?.en || item.item?.name?.ar;
    const slug = item.item?.slug?.en;
    if (name) return name;
    if (slug) return slug.replace(/-/g, ' ');
    return t.shopping_list.unknown_item;
  };

  const getQuantityDisplay = (item: any) => {
    const quantity = item.quantity;
    const unit = item.unit?.[language] || item.unit?.en || '';
    if (quantity === 0) return unit || t.shopping_list.as_needed;
    return `${quantity} ${unit}`.trim();
  };

  function formatItemsForImport(data: RawListItem[]) {
    const items: FormattedListItem[] = data.map((entry) => ({
      item: entry.item._id,
      itemType: entry.itemType,
      quantity: entry.quantity,
      unit: entry.unit,
      recipe: entry.recipe?._id,
      fruit: entry.fruit?._id,
      status: 'pending',
    }));

    return { items };
  }

  const handleImportList = async () => {
    const payload = formatItemsForImport(data?.data.items || []);
    console.log(payload);
    try {
      await importList(payload).unwrap();
      toast.success(t.shopping_list.list_imported_success);
      navigate(getLocalizedPath('/lists', language));
    } catch (error) {
      // if 401 unauthorized, navigate to login
      if (error && (error as any).status === 401) {
        navigate(getLocalizedPath('/login', language));
      }
    }
  };

  // handle checkout

  const handleCheckout = () => {
    // check if user has lcocation
    // if not open location modal
    if (purchasedItems.length > 0) {
      if (!user?.location) {
        setIsLocationModalOpen(true);
      }

      // or open choose store modal
      else {
        setIsChooseStoreModalOpen(true);
      }
    } else {
      toast.error(t.shopping_list.no_items_in_list);
    }
  };

  const handleChooseStore = (storeUrl: string) => {
    navigate(storeUrl);
  };

  const handleLocationSubmit = async (data: LocationType) => {
    // update user profile with location data
    try {
      const updatedData = {
        location: {
          country: data.location?.country,
          zip: data.location?.zip,
        },
      };
      const response = await editProfile(updatedData).unwrap();

      toast.success(response.message);
      // close location modal and open choose store modal
      setIsLocationModalOpen(false);
      setIsChooseStoreModalOpen(true);
    } catch (error: any) {
      toast.error(error?.data?.message || t.common.error_occurred);
      console.log('err', error);
    }
    // then navigate to checkout page
  };

  if (isLoading) return <Loader />;
  console.log('categoryStats', categoryStats);
  // group by category
  const groupItemsByCategory = (items: any[]) => {
    const grouped: Record<string, any[]> = {};
    items.forEach((item) => {
      const category = getItemCategory(item, language);
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });
    return grouped;
  };
  // groupItemsByRecipe
  const groupItemsByRecipe = (items: any[]) => {
    const grouped: Record<string, any[]> = {};
    const recipeNames: Record<string, string> = {};

    items.forEach((item) => {
      const recipeId = item.recipe?._id;
      const recipeName = item.recipe?.title?.[language] || item.recipe?.title?.en;

      if (!grouped[recipeId]) grouped[recipeId] = [];
      grouped[recipeId].push(item);

      recipeNames[recipeId] = recipeName;
    });

    return { grouped, recipeNames };
  };
  const { grouped, recipeNames } = groupItemsByRecipe(RecipeItems);

  console.log('groupItemsByRecipe', groupItemsByRecipe(RecipeItems));
  const renderShoppingItems = (items: any[]) =>
    items.map((item: any) => (
      <ShoppingItem
        key={item._id}
        item={item}
        language={language}
        toggleItem={toggleItem}
        removeItem={removeItem}
        isCustom={!userListsItems.some((ri: any) => ri._id === item._id)}
        isPdf={isPdf}
        // displayName={getItemDisplayName(item)}
        // quantityDisplay={getQuantityDisplay(item)}
        // recipeName={item.recipe?.title?.[language] || item.recipe?.title?.en}
      />
    ));

  return (
    <>
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <div className="mb-8  mt-[2.5rem] sm:mt-0">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-8 h-8 text-primaryColor" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {listData.name || t.shopping_list.title}
            </h1>
          </div>
          <p className="text-gray-600">
            {t.shopping_list.ingredients_in_list} ({totalCount} {t.shopping_list.total_items})
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {t.shopping_list.shopping_progress}
                </h3>
                <p className="text-sm text-gray-600">
                  {purchasedCount} {t.shopping_list.of} {totalCount}{' '}
                  {t.shopping_list.items_completed}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold text-primaryColor">
                  {completionPercentage.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-500">{t.shopping_list.complete_stat}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-primaryColor transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Items */}
          <div className="lg:col-span-8">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div
                  className={`flex flex-col sm:flex-row ${isRTL ? 'items-start' : 'items-start'}  sm:items-center justify-between mb-6`}
                >
                  <h3 className="text-lg mb-2 sm:mb-0 sm:text-xl font-bold text-gray-900">
                    {t.shopping_list.your_items}
                  </h3>
                  <div className="flex items-center gap-2">
                    {/* checkout button */}
                    <Button variant="secondary" onClick={handleCheckout}>
                      <span className="hidden sm:inline-block">{t.shopping_list.checkout}</span>
                      <ShoppingCartIcon className="w-4 h-4 sm:ml-2" />
                    </Button>
                    {token && (
                      <Button
                        onClick={handleImportList}
                        size="sm"
                        variant="outline"
                        className="text-primaryColor border-primaryColor hover:bg-primaryColor/10 hover:text-[#1c9a40]"
                      >
                        <Import className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline-block">
                          {t.shopping_list.import_list}
                        </span>
                      </Button>
                    )}
                    <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                      <span className="hidden sm:inline-block">{t.shopping_list.download_pdf}</span>
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => setIsShareModalOpen(true)}
                      size="sm"
                      className="bg-primaryColor hover:bg-[#1c9a40] text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline-block">{t.shopping_list.share}</span>
                    </Button>
                  </div>
                </div>

                <div ref={pdfRef}>
                  {pendingItems.length > 0 && (
                    <>
                      <div className="flex items-center justify-between mb-3 ">
                        <h4 className="text-md font-semibold text-gray-700 ">
                          {t.shopping_list.pending_items}
                        </h4>
                        <GroupingSelect groupBy={groupBy} setGroupBy={setGroupBy} />
                      </div>
                      {groupBy === 'aisle' ? (
                        // Group by category
                        Object.entries(groupItemsByCategory(pendingItems)).map(
                          ([category, items]) => (
                            <div key={category} className="mb-4">
                              <h5 className="text-sm font-semibold text-gray-600 mb-2">
                                {category}
                              </h5>

                              {renderShoppingItems(items)}
                            </div>
                          ),
                        )
                      ) : (
                        // Group by recipe (default behavior)
                        <>
                          {Object.entries(grouped).map(([recipeId, items]) => (
                            <div key={recipeId} className="mb-4">
                              <h5 className="text-md font-semibold text-gray-700 my-3">
                                {recipeNames[recipeId]}
                              </h5>
                              {renderShoppingItems(items)}
                            </div>
                          ))}
                          {CustomItems.length > 0 && (
                            <div className="mt-6">
                              <h5 className="text-md font-semibold text-gray-700 my-3">
                                {t.shopping_list.other}
                              </h5>
                              {renderShoppingItems(CustomItems)}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {purchasedItems.length > 0 && (
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-md font-semibold text-gray-700">
                          {t.shopping_list.purchased_items}
                        </h4>
                        <Button
                          onClick={handleClearPurchasedItems}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t.shopping_list.clear_purchased}
                        </Button>
                      </div>
                      {renderShoppingItems(purchasedItems)}
                    </div>
                  )}

                  {!pendingItems.length && !purchasedItems.length && !isLoading && (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {t.shopping_list.no_items_found}
                      </h3>
                      <p className="text-gray-500">{t.shopping_list.add_ingredients_msg}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar + Stats */}
          {/* (unchanged for brevity) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quick Add Custom Item Card */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    {t.shopping_list.quick_add}
                  </h3>
                  <div className="space-y-3">
                    <Input
                      placeholder={t.shopping_list.add_custom_item_placeholder}
                      className="border-gray-200"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
                    />
                    <Button
                      onClick={addNewItem}
                      className="w-full bg-primaryColor hover:bg-[#1c9a40] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t.shopping_list.add_item}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Shopping Statistics Card */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    {t.shopping_list.shopping_stats}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.shopping_list.total_items}</span>
                      <span className="font-semibold text-gray-900">{totalCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.shopping_list.completed}</span>
                      <span className="font-semibold text-green-600">{purchasedCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.shopping_list.remaining}</span>
                      <span className="font-semibold text-orange-600">
                        {totalCount - purchasedCount}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t.shopping_list.progress}</span>
                      <span className="font-semibold text-primaryColor">
                        {completionPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Categories Overview Card */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    {t.shopping_list.categories}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(categoryStats).map(([category, stats]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {stats.completed}/{stats.total}
                          </span>
                          <div className="w-12 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-primaryColor rounded-full transition-all"
                              style={{
                                width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Empty state for categories */}
                    {Object.keys(categoryStats).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        {t.shopping_list.no_categories}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareListModal
        listId={listId!}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      {/* Location Modal */}
      <LocationModal
        isOpen={isLoccationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSubmit={handleLocationSubmit}
      />
      {/* Choose Store Modal */}
      <ChooseStoreModal
        isOpen={isChoseStoreModalOpen}
        onClose={() => setIsChooseStoreModalOpen(false)}
        onSubmit={handleChooseStore}
      />
    </>
  );
};
