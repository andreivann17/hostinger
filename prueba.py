import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, save_img
from tensorflow.keras.applications.vgg16 import preprocess_input

# Clear all variables and close all figures
import matplotlib.pyplot as plt
plt.close('all')
import IPython
IPython.get_ipython().magic('clear')

# Define the data directory
data_directory = '/data/retinopathy/OCT/SERI/original_data/'
store_directory = '/data/retinopathy/OCT/SERI/pre_processed_data/alsaih_2016/'
directory_info = os.listdir(data_directory)

# Define the size of the OCT volume
x_size = 512
y_size = 128
z_size = 1024

for filename in directory_info:
    # Get only if the extension is .img
    if filename.endswith('.img'):
        file_path = os.path.join(data_directory, filename)

        # Read the volume
        vol = np.fromfile(file_path, dtype=np.uint8)
        vol = vol.reshape((z_size, y_size, x_size))

        # Preprocess the volume
        vol_preprocessed = preprocess_input(vol)

        # Store the preprocessed volume as images
        for i in range(z_size):
            img_path = os.path.join(store_directory, f'{filename}_slice{i}.png')
            slice_img = vol_preprocessed[i]
            save_img(img_path, slice_img)

        print(f"Volume {filename} preprocessed and stored as images")

# Convert the stored images to a TensorFlow dataset
image_paths = [os.path.join(store_directory, f'{filename}_slice{i}.png')
               for filename in directory_info
               for i in range(z_size)]
dataset = tf.data.Dataset.from_tensor_slices(image_paths)

# Apply any further transformations or processing to the dataset
# For example, you can resize the images or apply additional augmentation

# Iterate over the dataset and perform the desired operations
for image_path in dataset:
    # Load the image
    img = load_img(image_path)

    # Apply further processing to the image
    # For example, you can resize the image or apply additional transformations

    # Save the processed image
    save_img(image_path, img)

    print(f"Image {image_path} processed and saved")

print("All images processed and saved")

