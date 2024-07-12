import pandas as pd
import numpy as np
from datetime import datetime
import random

# Generate random data
pizzadata = {
    'Size': np.random.choice(['Small', 'Medium', 'Large', 'Extra Large'], size=1000),
    'Cheese': np.random.choice(['Yes', 'No'], size=1000),
    'Sauce': np.random.choice(['Yes', 'No'], size=1000),
    'Crust': np.random.choice(['New York Style', 'Deep Dish', 'Thin Crust', 'Stuffed Crust', 'Gluten Free', 'Detroit Style', 'Thick Crust', 'Sicilian', 'Greek Style'], size=1000),
    'Popularity': np.random.choice(['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'], size=1000),
    'Price': np.random.uniform(10, 30, size=1000).round(2),
    'Comments': ['Sample comment' for _ in range(1000)]
}

# Create a DataFrame
df = pd.DataFrame(pizzadata)

# Add Sock_ID attribute
df['Pizza_ID'] = np.arange(0, 1000)  # Incrementing number starting at 2


toppings_list = []
for i in range(1000):
    topping_amount = random.randint(0, 3)
    toppings = random.sample(['Perpperoni', 'Extra Cheese', 'Mushrooms', 'Onions', 'Sausage', 'Black Olives', 'Hot Oil', 'Bacon', 'Green Peppers', 'Red Peppers', 'Pineapple', 'Spinach'], topping_amount)
    toppings_list.append(toppings)

toppings_df = pd.DataFrame(toppings_list)
toppings_df.columns = ['topping_1', 'topping_2', 'topping_3']
df_merged = pd.concat([df, toppings_df], axis=1)
print(df_merged.head())



# Save DataFrame to Parquet file
json_file = 'pizza_data.json'
df_merged.to_json(json_file, orient='records')

print('Done!')