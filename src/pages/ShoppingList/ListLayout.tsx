import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetUserListQuery } from '@/redux/Features/Shopping List/ShoppingListApi';
import { Loader } from '@/components/ui/Loader';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { useLanguage } from '@/contexts/LanguageContext';

export const ListsLayout = () => {
  const navigate = useNavigate();
  const { id: listId } = useParams();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  console.log('Token:', token);
  console.log('listId:', listId);

  const { data: lists, isLoading } = useGetUserListQuery();

  const defaultList = lists?.data?.defaultList || null;
  const sharedLists = lists?.data?.sharedList || [];

  // Combine for iteration convenience
  const allLists = defaultList ? [defaultList, ...sharedLists] : [...sharedLists];

  console.log('lists:', lists);

  const { language } = useLanguage();
  useEffect(() => {
    // Redirect to default list if none selected
    if (!isLoading && defaultList && !listId) {
      navigate(getLocalizedPath(`/lists/${defaultList._id}`, language), { replace: true });
    }
  }, [isLoading, defaultList, listId, navigate, language]);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Sidebar */}
      {/* <aside className="w-72 border-r bg-white shadow-sm p-4 space-y-3">
        <h2 className="text-lg font-semibold mb-4">Your Lists</h2> */}

      {/* Default list */}
      {/* {defaultList && (
          <button
            onClick={() => navigate(`/lists/${defaultList._id}`)}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              listId === String(defaultList._id)
                ? 'bg-green-100 text-green-700 font-medium'
                : 'hover:bg-gray-100'
            }`}
          >
            🏠 Default List
          </button>
        )} */}

      {/* Shared lists */}
      {/* {sharedLists.length > 0 && (
          <>
            <h3 className="text-sm text-gray-500 mt-4 mb-1">Shared With Me</h3>
            {sharedLists.map((l: any) => (
              <button
                key={l._id}
                onClick={() => navigate(`/lists/${l._id}`)}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  listId === String(l._id)
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                {l.user?.firstName ? `${l.user.firstName} ${l.user.lastName}` : l._id}
              </button>
            ))}
          </>
        )}
      </aside> */}

      {/* Main Content */}
      <Outlet context={{ allLists }} />
    </>
  );
};
