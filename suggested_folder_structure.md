eeina-frontend/
│
├── public/                              # Static assets served as-is
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.json
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── placeholder.png
│   └── icons/
│       ├── apple-touch-icon.png
│       └── android-chrome-512x512.png
│
├── src/
│   │
│   ├── app/                            # 🎯 Application bootstrap & setup
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx       # Root provider composition
│   │   │   ├── LanguageProvider.tsx   # i18n context provider
│   │   │   ├── ReduxProvider.tsx      # Redux store provider
│   │   │   ├── ThemeProvider.tsx      # Theme/dark mode provider
│   │   │   └── index.ts
│   │   ├── router/
│   │   │   ├── AppRouter.tsx          # Main React Router setup
│   │   │   ├── ProtectedRoute.tsx     # Authentication guard component
│   │   │   ├── routes.config.ts       # Route definitions & paths
│   │   │   └── index.ts
│   │   ├── App.tsx                    # Root App component
│   │   └── index.ts
│   │
│   ├── core/                           # 🎯 Core infrastructure
│   │   │
│   │   ├── api/                       # RTK Query API layer
│   │   │   ├── baseApi.ts            # Base API with fetchBaseQuery
│   │   │   ├── auth.api.ts           # Authentication endpoints
│   │   │   ├── recipe.api.ts         # Recipe CRUD endpoints
│   │   │   ├── user.api.ts           # User profile endpoints
│   │   │   ├── ingredient.api.ts     # Ingredient endpoints
│   │   │   ├── food.api.ts           # Processed food endpoints
│   │   │   ├── fruit.api.ts          # Fruit endpoints
│   │   │   ├── category.api.ts       # Category endpoints
│   │   │   ├── mealPlan.api.ts       # Meal planner endpoints
│   │   │   ├── shoppingList.api.ts   # Shopping list endpoints
│   │   │   ├── goals.api.ts          # Goals management endpoints
│   │   │   ├── recipeRate.api.ts     # Recipe rating endpoints
│   │   │   ├── saved.api.ts          # Saved recipes endpoints
│   │   │   ├── types/
│   │   │   │   ├── request.types.ts  # API request DTOs
│   │   │   │   ├── response.types.ts # API response DTOs
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── store/                     # Redux store configuration
│   │   │   ├── slices/
│   │   │   │   ├── auth.slice.ts     # Auth state management
│   │   │   │   ├── likes.slice.ts    # Recipe likes state
│   │   │   │   ├── saved.slice.ts    # Saved recipes state
│   │   │   │   ├── ui.slice.ts       # UI state (modals, sidebar, etc.)
│   │   │   │   └── index.ts
│   │   │   ├── middleware/
│   │   │   │   ├── logger.middleware.ts  # Redux logger
│   │   │   │   └── index.ts
│   │   │   ├── hooks.ts              # Typed useDispatch, useSelector
│   │   │   ├── store.ts              # Store configuration
│   │   │   ├── persistConfig.ts      # Redux persist config
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                  # Cross-domain business services
│   │   │   ├── analytics.service.ts  # Google Analytics, tracking
│   │   │   ├── export.service.ts     # PDF/CSV/JSON export
│   │   │   ├── notification.service.ts # Toast/push notifications
│   │   │   ├── integration.service.ts # 3rd-party integrations
│   │   │   └── index.ts
│   │   │
│   │   ├── schemas/                   # Validation schemas (Zod)
│   │   │   ├── auth.schema.ts        # Auth form validation
│   │   │   ├── recipe.schema.ts      # Recipe form validation
│   │   │   ├── user.schema.ts        # User profile validation
│   │   │   ├── mealPlan.schema.ts    # Meal plan validation
│   │   │   ├── goal.schema.ts        # Goal validation
│   │   │   └── index.ts
│   │   │
│   │   ├── types/                     # Shared TypeScript types
│   │   │   ├── models/
│   │   │   │   ├── User.model.ts     # User entity type
│   │   │   │   ├── Recipe.model.ts   # Recipe entity type
│   │   │   │   ├── Ingredient.model.ts # Ingredient entity type
│   │   │   │   ├── Food.model.ts     # Processed food entity type
│   │   │   │   ├── Fruit.model.ts    # Fruit entity type
│   │   │   │   ├── Category.model.ts # Category entity type
│   │   │   │   ├── MealPlan.model.ts # Meal plan entity type
│   │   │   │   ├── ShoppingList.model.ts # Shopping list entity type
│   │   │   │   ├── Goal.model.ts     # Goal entity type
│   │   │   │   ├── Comment.model.ts  # Comment entity type
│   │   │   │   ├── Rating.model.ts   # Rating entity type
│   │   │   │   └── index.ts
│   │   │   ├── enums/
│   │   │   │   ├── RecipeDifficulty.enum.ts
│   │   │   │   ├── UserRole.enum.ts
│   │   │   │   ├── GoalType.enum.ts
│   │   │   │   ├── MealType.enum.ts
│   │   │   │   └── index.ts
│   │   │   ├── common.types.ts       # Common shared types
│   │   │   └── index.ts
│   │   │
│   │   ├── config/                    # App configuration
│   │   │   ├── constants.ts          # App constants
│   │   │   ├── env.ts                # Environment variables
│   │   │   ├── routes.config.ts      # Route paths
│   │   │   ├── api.config.ts         # API configuration
│   │   │   ├── theme.config.ts       # Theme configuration
│   │   │   └── index.ts
│   │   │
│   │   └── utils/                     # Core utility functions
│   │       ├── formatters/
│   │       │   ├── date.formatter.ts
│   │       │   ├── number.formatter.ts
│   │       │   ├── time.formatter.ts
│   │       │   ├── count.formatter.ts
│   │       │   └── index.ts
│   │       ├── validators/
│   │       │   ├── email.validator.ts
│   │       │   ├── password.validator.ts
│   │       │   └── index.ts
│   │       ├── helpers/
│   │       │   ├── storage.helper.ts
│   │       │   ├── url.helper.ts
│   │       │   ├── array.helper.ts
│   │       │   ├── string.helper.ts
│   │       │   └── index.ts
│   │       ├── cn.ts                  # Tailwind className utility
│   │       └── index.ts
│   │
│   ├── features/                       # 🎯 Domain-driven feature modules
│   │   │
│   │   ├── auth/                      # Authentication feature
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── LoginForm.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SignupForm/
│   │   │   │   │   ├── SignupForm.tsx
│   │   │   │   │   ├── SignupForm.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── OtpInput/
│   │   │   │   │   ├── OtpInput.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SocialLogin/
│   │   │   │   │   ├── SocialLogin.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── PasswordStrength/
│   │   │   │   │   ├── PasswordStrength.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useSignup.ts
│   │   │   │   ├── useLogout.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── recipe/                    # Recipe management feature
│   │   │   ├── components/
│   │   │   │   ├── RecipeCard/
│   │   │   │   │   ├── RecipeCard.tsx
│   │   │   │   │   ├── RecipeCard.types.ts
│   │   │   │   │   ├── RecipeCardImage.tsx
│   │   │   │   │   ├── RecipeCardMeta.tsx
│   │   │   │   │   ├── RecipeCardActions.tsx
│   │   │   │   │   ├── RecipeCardSkeleton.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipeGrid/
│   │   │   │   │   ├── RecipeGrid.tsx
│   │   │   │   │   ├── RecipeGrid.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipeList/
│   │   │   │   │   ├── RecipeList.tsx
│   │   │   │   │   ├── RecipeListItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipeForm/
│   │   │   │   │   ├── RecipeForm.tsx
│   │   │   │   │   ├── RecipeForm.types.ts
│   │   │   │   │   ├── sections/
│   │   │   │   │   │   ├── BasicInfoSection.tsx
│   │   │   │   │   │   ├── IngredientsSection.tsx
│   │   │   │   │   │   ├── InstructionsSection.tsx
│   │   │   │   │   │   ├── ImagesSection.tsx
│   │   │   │   │   │   ├── NutritionSection.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── fields/
│   │   │   │   │   │   ├── MultilingualInput.tsx
│   │   │   │   │   │   ├── IngredientField.tsx
│   │   │   │   │   │   ├── InstructionField.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipeDetails/
│   │   │   │   │   ├── RecipeHeader.tsx
│   │   │   │   │   ├── RecipeIngredients.tsx
│   │   │   │   │   ├── RecipeInstructions.tsx
│   │   │   │   │   ├── RecipeNutrition.tsx
│   │   │   │   │   ├── RecipeComments.tsx
│   │   │   │   │   ├── RecipeRating.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipePrint/
│   │   │   │   │   ├── PrintModal.tsx
│   │   │   │   │   ├── PrintCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RecipeStats/
│   │   │   │   │   ├── RecipeStats.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useRecipes.ts
│   │   │   │   ├── useRecipeDetails.ts
│   │   │   │   ├── useRecipeLikes.ts
│   │   │   │   ├── useRecipeSave.ts
│   │   │   │   ├── useRecipeCreate.ts
│   │   │   │   ├── useRecipeUpdate.ts
│   │   │   │   ├── useRecipeDelete.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── recipeHelpers.ts
│   │   │   │   ├── recipeFormatters.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── recipe.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ingredient/                # Ingredients feature
│   │   │   ├── components/
│   │   │   │   ├── IngredientCard/
│   │   │   │   │   ├── IngredientCard.tsx
│   │   │   │   │   ├── IngredientCard.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── IngredientGrid/
│   │   │   │   │   ├── IngredientGrid.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── IngredientDetails/
│   │   │   │   │   ├── IngredientHeader.tsx
│   │   │   │   │   ├── IngredientNutrition.tsx
│   │   │   │   │   ├── IngredientRecipes.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useIngredients.ts
│   │   │   │   ├── useIngredientDetails.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── ingredient.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── food/                      # Processed food feature
│   │   │   ├── components/
│   │   │   │   ├── FoodCard/
│   │   │   │   │   ├── FoodCard.tsx
│   │   │   │   │   ├── FoodCard.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FoodGrid/
│   │   │   │   │   ├── FoodGrid.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FoodDetails/
│   │   │   │   │   ├── FoodHeader.tsx
│   │   │   │   │   ├── FoodNutrition.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useFoods.ts
│   │   │   │   ├── useFoodDetails.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── food.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── fruit/                     # Fruits feature
│   │   │   ├── components/
│   │   │   │   ├── FruitCard/
│   │   │   │   │   ├── FruitCard.tsx
│   │   │   │   │   ├── FruitCard.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FruitGrid/
│   │   │   │   │   ├── FruitGrid.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FruitDetails/
│   │   │   │   │   ├── FruitHeader.tsx
│   │   │   │   │   ├── FruitNutrition.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useFruits.ts
│   │   │   │   ├── useFruitDetails.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── fruit.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── category/                  # Categories feature
│   │   │   ├── components/
│   │   │   │   ├── CategoryCard/
│   │   │   │   │   ├── CategoryCard.tsx
│   │   │   │   │   ├── CategoryCard.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── CategoryHero/
│   │   │   │   │   ├── CategoryHero.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── CategoryGrid/
│   │   │   │   │   ├── CategoryGrid.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useCategories.ts
│   │   │   │   ├── useCategoryRecipes.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── category.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── search/                    # Search feature
│   │   │   ├── components/
│   │   │   │   ├── SearchBar/
│   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   ├── SearchBar.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SearchFilters/
│   │   │   │   │   ├── SearchFilters.tsx
│   │   │   │   │   ├── FilterChip.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SearchResults/
│   │   │   │   │   ├── RecipeResults.tsx
│   │   │   │   │   ├── IngredientResults.tsx
│   │   │   │   │   ├── FoodResults.tsx
│   │   │   │   │   ├── FruitResults.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useSearch.ts
│   │   │   │   ├── useSearchFilters.ts
│   │   │   │   ├── useSearchHistory.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── search.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── user/                      # User profile feature
│   │   │   ├── components/
│   │   │   │   ├── UserProfile/
│   │   │   │   │   ├── UserProfile.tsx
│   │   │   │   │   ├── UserBio.tsx
│   │   │   │   │   ├── UserStats.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── UserCard/
│   │   │   │   │   ├── UserCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── UserAvatar/
│   │   │   │   │   ├── UserAvatar.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── UserRecipes/
│   │   │   │   │   ├── UserRecipes.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── EditProfile/
│   │   │   │   │   ├── EditProfileForm.tsx
│   │   │   │   │   ├── AvatarUpload.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useUser.ts
│   │   │   │   ├── useUserProfile.ts
│   │   │   │   ├── useUserUpdate.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── user.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── mealPlanner/               # Meal planner feature
│   │   │   ├── components/
│   │   │   │   ├── MealCalendar/
│   │   │   │   │   ├── MealCalendar.tsx
│   │   │   │   │   ├── CalendarDay.tsx
│   │   │   │   │   ├── CalendarWeek.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── MealCard/
│   │   │   │   │   ├── MealCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── DailyMeals/
│   │   │   │   │   ├── DailyMeals.tsx
│   │   │   │   │   ├── MealSlot.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── WeeklyMeals/
│   │   │   │   │   ├── WeeklyMeals.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── MealModal/
│   │   │   │   │   ├── MealModal.tsx
│   │   │   │   │   ├── RecipeSelector.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── NutritionGoals/
│   │   │   │   │   ├── NutritionGoals.tsx
│   │   │   │   │   ├── MacroBar.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useMealPlanner.ts
│   │   │   │   ├── useMealCalendar.ts
│   │   │   │   ├── useMealPlan.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── mealPlanGenerator.service.ts
│   │   │   │   ├── nutritionCalculator.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── mealPlanHelpers.ts
│   │   │   │   ├── dateHelpers.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── mealPlan.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── goals/                     # Goals management feature
│   │   │   ├── components/
│   │   │   │   ├── GoalCard/
│   │   │   │   │   ├── GoalCard.tsx
│   │   │   │   │   ├── GoalCardEnhanced.tsx
│   │   │   │   │   ├── GoalProgress.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── GoalModal/
│   │   │   │   │   ├── GoalModal.tsx
│   │   │   │   │   ├── GoalModalEnhanced.tsx
│   │   │   │   │   ├── GoalForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── GoalList/
│   │   │   │   │   ├── GoalList.tsx
│   │   │   │   │   ├── GoalListItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── HealthProfile/
│   │   │   │   │   ├── HealthProfile.tsx
│   │   │   │   │   ├── HealthProfileNew.tsx
│   │   │   │   │   ├── HealthMetrics.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Analytics/
│   │   │   │   │   ├── CategoryRadarChart.tsx
│   │   │   │   │   ├── GoalComparisonChart.tsx
│   │   │   │   │   ├── ProgressChart.tsx
│   │   │   │   │   ├── ProgressTrendChart.tsx
│   │   │   │   │   ├── DashboardSummary.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── MealPlan/
│   │   │   │   │   ├── MyMealPlans.tsx
│   │   │   │   │   ├── MealPlanTemplateCard.tsx
│   │   │   │   │   ├── MealPlanTemplatesModal.tsx
│   │   │   │   │   ├── MealPlanSuggestionModal.tsx
│   │   │   │   │   ├── DietPlanGenerator.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Progress/
│   │   │   │   │   ├── PhotoProgressTracker.tsx
│   │   │   │   │   ├── ProgressTimeline.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Recommendations/
│   │   │   │   │   ├── AIRecommendations.tsx
│   │   │   │   │   ├── DietSuggestions.tsx
│   │   │   │   │   ├── GoalMealPlanRecommendations.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Achievements/
│   │   │   │   │   ├── Achievements.tsx
│   │   │   │   │   ├── YearInReview.tsx
│   │   │   │   │   ├── Confetti.tsx
│   │   │   │   │   ├── Badge.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Reports/
│   │   │   │   │   ├── Reports.tsx
│   │   │   │   │   ├── ExportModal.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Templates/
│   │   │   │   │   ├── GoalTemplatesModal.tsx
│   │   │   │   │   ├── TemplateCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Mobile/
│   │   │   │   │   ├── MobileNav.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── EmojiPicker/
│   │   │   │   │   ├── EmojiPicker.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useGoals.ts
│   │   │   │   ├── useGoalTemplates.ts
│   │   │   │   ├── useHealthProfile.ts
│   │   │   │   ├── useGoalProgress.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── goalExport.service.ts
│   │   │   │   ├── goalAnalytics.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── data/
│   │   │   │   ├── goalTemplates.ts
│   │   │   │   ├── mealPlanTemplates.ts
│   │   │   │   ├── achievementBadges.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── goalHelpers.ts
│   │   │   │   ├── goalCalculations.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── goal.types.ts
│   │   │   │   ├── health.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── shoppingList/              # Shopping list feature
│   │   │   ├── components/
│   │   │   │   ├── ShoppingListCard/
│   │   │   │   │   ├── ShoppingListCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ShoppingListItem/
│   │   │   │   │   ├── ShoppingListItem.tsx
│   │   │   │   │   ├── ItemCheckbox.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ShoppingListDetails/
│   │   │   │   │   ├── ListHeader.tsx
│   │   │   │   │   ├── ListItems.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ShareListModal/
│   │   │   │   │   ├── ShareListModal.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useShoppingLists.ts
│   │   │   │   ├── useShoppingListItems.ts
│   │   │   │   ├── useListShare.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── shoppingList.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── trending/                  # Trending feature
│   │   │   ├── components/
│   │   │   │   ├── TrendingRecipeCard/
│   │   │   │   │   ├── TrendingRecipeCard.tsx
│   │   │   │   │   ├── TrendingBadge.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TrendingSection/
│   │   │   │   │   ├── TrendingSection.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TopCreators/
│   │   │   │   │   ├── TopCreators.tsx
│   │   │   │   │   ├── CreatorCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTrending.ts
│   │   │   │   ├── useTrendingRecipes.ts
│   │   │   │   ├── useTopCreators.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── trending.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── shared/                         # 🎯 Shared cross-feature components
│   │   │
│   │   ├── components/
│   │   │   ├── ImageUploader/
│   │   │   │   ├── ImageUploader.tsx
│   │   │   │   ├── ImageUploader.types.ts
│   │   │   │   ├── ImageCropper.tsx
│   │   │   │   ├── ImagePreview.tsx
│   │   │   │   └── index.ts
│   │   │   ├── LanguageSwitcher/
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageHeader/
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   ├── PageHeaderWithSearch.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ShareModal/
│   │   │   │   ├── ShareModal.tsx
│   │   │   │   ├── ShareModal.types.ts
│   │   │   │   ├── ShareButtons.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── ErrorFallback.tsx
│   │   │   │   └── index.ts
│   │   │   ├── LoadingBoundary/
│   │   │   │   ├── LoadingBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── InfiniteScroll/
│   │   │   │   ├── InfiniteScroll.tsx
│   │   │   │   └── index.ts
│   │   │   ├── EmptyState/
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   ├── useInfiniteScroll.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useClickOutside.ts
│   │   │   ├── useCopyToClipboard.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── usePrevious.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── translators/
│   │   │   │   ├── translateDifficulty.ts
│   │   │   │   ├── getLocalizedPath.ts
│   │   │   │   └── index.ts
│   │   │   ├── exporters/
│   │   │   │   ├── pdfExport.ts
│   │   │   │   ├── csvExport.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── ui/                             # 🎯 Design system (Pure UI)
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Avatar.types.ts
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   ├── Badge.types.ts
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── IconButton.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── CardHeader.tsx
│   │   │   ├── CardContent.tsx
│   │   │   ├── CardFooter.tsx
│   │   │   ├── CardDescription.tsx
│   │   │   └── index.ts
│   │   ├── Dialog/
│   │   │   ├── Dialog.tsx
│   │   │   ├── Dialog.types.ts
│   │   │   ├── DialogOverlay.tsx
│   │   │   ├── DialogContent.tsx
│   │   │   ├── DialogHeader.tsx
│   │   │   ├── DialogFooter.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Input.types.ts
│   │   │   └── index.ts
│   │   ├── Label/
│   │   │   ├── Label.tsx
│   │   │   └── index.ts
│   │   ├── Loader/
│   │   │   ├── Loader.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── SkeletonText.tsx
│   │   │   └── index.ts
│   │   ├── NavigationMenu/
│   │   │   ├── NavigationMenu.tsx
│   │   │   ├── NavigationMenuItem.tsx
│   │   │   └── index.ts
│   │   ├── ProgressBar/
│   │   │   ├── ProgressBar.tsx
│   │   │   └── index.ts
│   │   ├── RadioGroup/
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── RadioGroupItem.tsx
│   │   │   └── index.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   ├── SelectItem.tsx
│   │   │   └── index.ts
│   │   ├── Separator/
│   │   │   ├── Separator.tsx
│   │   │   └── index.ts
│   │   ├── Tooltip/
│   │   │   ├── Tooltip.tsx
│   │   │   └── index.ts
│   │   ├── Toast/
│   │   │   ├── Toast.tsx
│   │   │   ├── Toaster.tsx
│   │   │   └── index.ts
│   │   ├── Checkbox/
│   │   │   ├── Checkbox.tsx
│   │   │   └── index.ts
│   │   ├── Switch/
│   │   │   ├── Switch.tsx
│   │   │   └── index.ts
│   │   ├── Tabs/
│   │   │   ├── Tabs.tsx
│   │   │   ├── TabsList.tsx
│   │   │   ├── TabsTrigger.tsx
│   │   │   ├── TabsContent.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── widgets/                        # 🎯 Complex composite components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.types.ts
│   │   │   ├── DesktopNav.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── MobileBottomNav.tsx
│   │   │   ├── SubMenu.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   ├── FooterLinks.tsx
│   │   │   ├── FooterSocial.tsx
│   │   │   ├── FooterNewsletter.tsx
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarNav.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── screens/                        # 🎯 Route-level screen components
│   │   │
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── HomeScreen.types.ts
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── FeaturedSection.tsx
│   │   │   │   ├── ProfileSection.tsx
│   │   │   │   ├── ActionsSection.tsx
│   │   │   │   ├── TrendingSection.tsx
│   │   │   │   ├── TopCreatorsSection.tsx
│   │   │   │   ├── RecipeCardSection.tsx
│   │   │   │   ├── PopularRecipesSection.tsx
│   │   │   │   ├── AdSection.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   ├── VerifyOtpScreen.tsx
│   │   │   ├── GoalsSetupScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   ├── ResetPasswordScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Recipe/
│   │   │   ├── RecipeDetailsScreen.tsx
│   │   │   ├── RecipeDetailsScreen.types.ts
│   │   │   ├── RecipeNotFoundScreen.tsx
│   │   │   ├── CreateRecipeScreen.tsx
│   │   │   ├── EditRecipeScreen.tsx
│   │   │   ├── SavedRecipesScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Category/
│   │   │   ├── CategoryScreen.tsx
│   │   │   ├── CategoryScreen.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── Ingredient/
│   │   │   ├── IngredientsScreen.tsx
│   │   │   ├── IngredientDetailsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Food/
│   │   │   ├── ProcessedFoodScreen.tsx
│   │   │   ├── ProcessedFoodDetailsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Fruit/
│   │   │   ├── FruitsScreen.tsx
│   │   │   ├── FruitDetailsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Explore/
│   │   │   ├── ExploreScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Trending/
│   │   │   ├── TrendingScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Search/
│   │   │   ├── SearchResultsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Profile/
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── UserProfileScreen.tsx
│   │   │   ├── EditProfileScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── MealPlanner/
│   │   │   ├── MealPlannerScreen.tsx
│   │   │   ├── MealPlannerScreen.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── Goals/
│   │   │   ├── GoalsManagementScreen.tsx
│   │   │   ├── GoalsManagementScreen.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ShoppingList/
│   │   │   ├── ShoppingListsScreen.tsx
│   │   │   ├── ShoppingListDetailsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Settings/
│   │   │   ├── AccountSettingsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── Legal/
│   │   │   ├── PrivacyPolicyScreen.tsx
│   │   │   ├── TermsConditionsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── NotFoundScreen.tsx
│   │   └── index.ts
│   │
│   ├── locales/                        # 🎯 Internationalization
│   │   ├── en/
│   │   │   ├── auth.json
│   │   │   ├── common.json
│   │   │   ├── recipe.json
│   │   │   ├── navigation.json
│   │   │   ├── goals.json
│   │   │   ├── mealPlanner.json
│   │   │   ├── profile.json
│   │   │   ├── settings.json
│   │   │   ├── shoppingList.json
│   │   │   ├── footer.json
│   │   │   ├── privacyPolicy.json
│   │   │   ├── termsAndCondition.json
│   │   │   ├── explore.json
│   │   │   ├── createRecipe.json
│   │   │   ├── saved.json
│   │   │   └── index.ts
│   │   ├── ar/
│   │   │   └── [mirror structure of en/]
│   │   ├── i18n.config.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── assets/                         # Static assets
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── placeholder-recipe.jpg
│   │   │   ├── placeholder-user.png
│   │   │   └── hero-bg.jpg
│   │   ├── icons/
│   │   │   ├── apple-icon.svg
│   │   │   ├── google-icon.svg
│   │   │   └── facebook-icon.svg
│   │   ├── fonts/
│   │   │   ├── Inter-Regular.woff2
│   │   │   ├── Inter-Medium.woff2
│   │   │   ├── Inter-Bold.woff2
│   │   │   └── Amiri-Regular.woff2
│   │   └── videos/
│   │       └── hero-video.mp4
│   │
│   ├── styles/                         # Global styles
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   ├── themes/
│   │   │   ├── light.css
│   │   │   └── dark.css
│   │   └── variables.css
│   │
│   ├── test/                           # Testing utilities
│   │   ├── mocks/
│   │   │   ├── handlers.ts
│   │   │   ├── server.ts
│   │   │   └── data.ts
│   │   ├── fixtures/
│   │   │   ├── recipe.fixture.ts
│   │   │   ├── user.fixture.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── test-utils.tsx
│   │   │   └── index.ts
│   │   └── setup.ts
│   │
│   ├── docs/                           # Documentation
│   │   ├── architecture.md
│   │   ├── conventions.md
│   │   ├── components.md
│   │   ├── api.md
│   │   └── deployment.md
│   │
│   ├── main.tsx                        # Application entry point
│   ├── vite-env.d.ts                   # Vite type definitions
│   └── index.html
│
├── .env                                 # Environment variables
├── .env.example                         # Environment variables example
├── .env.development                     # Development environment
├── .env.production                      # Production environment
├── .eslintrc.cjs                        # ESLint configuration
├── .prettierrc                          # Prettier configuration
├── .gitignore                          # Git ignore rules
├── tsconfig.json                       # TypeScript config (base)
├── tsconfig.app.json                   # TypeScript config (app)
├── tsconfig.node.json                  # TypeScript config (Vite)
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Dependencies & scripts
├── pnpm-lock.yaml                      # Package lock file
└── README.md                           # Project documentation