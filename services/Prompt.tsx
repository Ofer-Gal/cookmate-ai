import { Completions } from "openai/resources/completions";

const prompts = {
    GENERATE_RECIPE_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji,
    2 line description and main ingredient list in JSON format with field recipeName,description,ingredients (without size) only`,
    GENERATE_COMPLETE_RECIPE_PROMPT: `
    - As per recipe Name and Description, Give me all list of ingredients as ingredient,
    - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
    - Total Calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo
    - relastic image Text prompt as per reciepe as imagePrompt
    - Give me category List for recipe from [Breakfast, Lunch,Soup,Dinner,Salad,Drink,Cake] as category
    - Give me response in JSON format only`,
    options: [
        {
            recipeName: "Crispy Hash Brown Breakfast Bowl",
            description:
                "Golden hash browns topped with eggs, cheese, and fresh veggies for a hearty morning meal.",
            ingredients: [
                "potatoes",
                "eggs",
                "cheddar cheese",
                "bell peppers",
                "onions",
                "avocado",
                "salt",
                "pepper",
            ],
        },
        {
            recipeName: "Vegan Potato & Chickpea Scramble",
            description:
                "Spiced potatoes and chickpeas scrambled with turmeric, served with fresh herbs and toast.",
            ingredients: [
                "potatoes",
                "chickpeas",
                "turmeric",
                "cumin",
                "onion",
                "garlic",
                "spinach",
                "lemon",
            ],
        },
        {
            recipeName: "Cheesy Potato & Bacon Breakfast Skillet",
            description:
                "Sizzling skillet of potatoes, crispy bacon, melted cheese, and a runny egg on top.",
            ingredients: [
                "potatoes",
                "bacon",
                "eggs",
                "cheddar cheese",
                "green onions",
                "butter",
                "paprika",
            ],
        },
    ],
    Complete:{
        "recipeName": "Crispy Hash Brown Breakfast Bowl",
        "description": "Golden hash browns topped with eggs, cheese, and fresh veggies for a hearty morning meal.",
        "ingredients": [
            {
                "ingredient": "Hash browns",
                "icon": "🥔",
                "quantity": "2 cups (shredded)"
            },
            {
                "ingredient": "Eggs",
                "icon": "🥚",
                "quantity": "2 large"
            },
            {
                "ingredient": "Cheddar cheese",
                "icon": "🧀",
                "quantity": "1/4 cup (shredded)"
            },
            {
                "ingredient": "Bell pepper",
                "icon": "🫑",
                "quantity": "1/4 cup (diced)"
            },
            {
                "ingredient": "Red onion",
                "icon": "🧅",
                "quantity": "2 tbsp (diced)"
            },
            {
                "ingredient": "Avocado",
                "icon": "🥑",
                "quantity": "1/2 (sliced)"
            },
            {
                "ingredient": "Cherry tomatoes",
                "icon": "🍅",
                "quantity": "4-5 (halved)"
            },
            {
                "ingredient": "Olive oil",
                "icon": "🫒",
                "quantity": "1 tbsp"
            },
            {
                "ingredient": "Salt",
                "icon": "🧂",
                "quantity": "to taste"
            },
            {
                "ingredient": "Black pepper",
                "icon": "⚫",
                "quantity": "to taste"
            },
            {
                "ingredient": "Fresh parsley",
                "icon": "🌿",
                "quantity": "for garnish"
            }
        ],
        "steps": [
            "Heat olive oil in a skillet over medium heat.",
            "Add shredded hash browns, pressing them down to form an even layer. Cook for 5-7 minutes until golden brown, then flip and cook the other side for another 5 minutes.",
            "While hash browns cook, prepare the eggs as desired (fried, scrambled, or poached).",
            "Once hash browns are crispy, transfer them to a serving bowl.",
            "Top the hash browns with cooked eggs, shredded cheddar cheese, diced bell pepper, red onion, avocado slices, and halved cherry tomatoes.",
            "Season with salt and black pepper to taste.",
            "Garnish with fresh parsley and serve immediately."
        ],
        "calories": 450,
        "cookTime": 20,
        "serveTo": 1,
        "imagePrompt": "A rustic breakfast bowl featuring golden crispy hash browns as the base, topped with perfectly cooked sunny-side-up eggs, melted cheddar cheese, fresh diced bell peppers, red onions, creamy avocado slices, and vibrant cherry tomatoes, garnished with parsley, served in a white ceramic bowl with morning sunlight streaming in the background."
    }
};

export default prompts;
