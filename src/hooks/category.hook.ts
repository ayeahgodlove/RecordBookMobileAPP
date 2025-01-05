import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {emptyCategory, ICategory} from '../models/category';
import {RootState} from '../redux/store';
import {
  addCategorySuccess,
  editCategorySuccess,
  fetchCategoriesAsync,
  setActiveCategory,
} from '../redux/slices/category.slice';
import {categoryService} from '../services/category.service';

const useCategory = () => {
  const categories = useSelector<RootState, ICategory[]>(
    state => state.category.categories,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.category.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.category.initialFetch,
  );
  const category = useSelector<RootState, ICategory>(
    state => state.category.category,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadCategorys = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchCategoriesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addCategory = async (category: ICategory) => {
    return await categoryService
      .create(category)
      .then(categoryResponse => {
        if (categoryResponse.success) {
          dispatch(addCategorySuccess(categoryResponse.data));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;

        return false;
      });
  };

  const setCategory = (category: ICategory) => {
    dispatch(setActiveCategory(category));
  };

  const getCategoryName = (categoryId: string) => {
    const categoryName = categories.find(c => c.id === categoryId)?.name;
    if (categoryName) {
      return categoryName;
    } else {
      return emptyCategory.name;
    }
  };
  const editCategory = async (category: ICategory) => {
    return await categoryService
      .update(category)
      .then(categoryResponse => {
        if (categoryResponse.success) {
          dispatch(editCategorySuccess(categoryResponse.data));
          setCategory(categoryResponse.data);
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;
        return false;
      });
  };

  useEffect(() => {
  }, [category, categories, isLoading, initialFetch]);

  return {
    category,
    categories,
    isLoading,
    initialFetch,
    addCategory,
    editCategory,
    setCategory,
    loading,
    getCategoryName,
  };
};

export {useCategory};
