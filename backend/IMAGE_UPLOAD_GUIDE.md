# Image Upload & Display Guide with Pillow

## Setup Complete ✓

Your Django backend is now configured to:
1. Accept image uploads via the `Item` model
2. Store images in the `media/items/` directory
3. Serve images via the media URL at `http://localhost:8000/media/`
4. Frontend displays images from the API response

## How to Upload Images

### 1. Via Django Admin
```bash
python manage.py runserver
# Go to http://localhost:8000/admin/
# Login and navigate to Items
# Upload images via the admin panel
```

### 2. Via API (Using Postman/cURL)

**Using cURL:**
```bash
curl -X POST http://localhost:8000/api/items/ \
  -H "Content-Type: multipart/form-data" \
  -F "name=My Item" \
  -F "description=A beautiful item" \
  -F "price=99.99" \
  -F "category=1" \
  -F "image=@/path/to/image.jpg"
```

**Using Python requests:**
```python
import requests

files = {
    'image': open('image.jpg', 'rb'),
    'name': (None, 'My Item'),
    'description': (None, 'A beautiful item'),
    'price': (None, '99.99'),
    'category': (None, '1'),
}

response = requests.post(
    'http://localhost:8000/api/items/',
    files=files
)
```

## Processing Images with Pillow

### Add Image Processing to Models

Edit `backend/store/models.py`:

```python
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

class Item(models.Model):
    # ... existing fields ...
    
    def save(self, *args, **kwargs):
        # Resize image if it exists
        if self.image:
            img = Image.open(self.image)
            
            # Resize to max 800x600
            img.thumbnail((800, 600), Image.Resampling.LANCZOS)
            
            # Save to BytesIO
            img_io = BytesIO()
            img.save(img_io, format='JPEG', quality=85)
            img_io.seek(0)
            
            # Save back to field
            self.image.save(
                self.image.name,
                ContentFile(img_io.getvalue()),
                save=False
            )
        
        super().save(*args, **kwargs)
```

### Create Image Processing Utility

Create `backend/store/image_utils.py`:

```python
from PIL import Image, ImageOps
import os
from django.core.files.base import ContentFile
from io import BytesIO

def optimize_image(image_field, max_width=800, max_height=600, quality=85):
    """Optimize and resize image"""
    img = Image.open(image_field)
    
    # Convert RGBA to RGB if needed
    if img.mode in ('RGBA', 'LA', 'P'):
        rgb_img = Image.new('RGB', img.size, (255, 255, 255))
        rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = rgb_img
    
    # Resize maintaining aspect ratio
    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    
    # Save optimized version
    img_io = BytesIO()
    img.save(img_io, format='JPEG', quality=quality, optimize=True)
    img_io.seek(0)
    
    return ContentFile(img_io.getvalue())

def create_thumbnail(image_field, size=(200, 200)):
    """Create thumbnail from image"""
    img = Image.open(image_field)
    img.thumbnail(size, Image.Resampling.LANCZOS)
    
    img_io = BytesIO()
    img.save(img_io, format='JPEG', quality=85)
    img_io.seek(0)
    
    return ContentFile(img_io.getvalue())
```

## Frontend Image Display

Your ProductCard component now:
- Constructs full image URLs: `http://api/media/items/filename.jpg`
- Shows fallback emoji if image fails to load
- Displays images with proper sizing and object-fit

## API Response Format

Items endpoint returns:
```json
{
  "id": 1,
  "name": "Product Name",
  "image": "items/product_001.jpg",
  "category": {
    "id": 1,
    "name": "Category",
    "slug": "category"
  },
  "description": "Product description",
  "price": "99.99"
}
```

## Troubleshooting

**Images not showing?**
- Check that `DEBUG=True` in settings.py
- Verify `MEDIA_URL` and `MEDIA_ROOT` are configured
- Check browser console for image 404 errors

**Upload failing?**
- Run migrations: `python manage.py migrate`
- Check file permissions on `media/` folder
- Verify Pillow is installed: `pip list | grep Pillow`

**CORS errors?**
- Frontend API URL should match backend CORS_ALLOWED_ORIGINS
- Check your `.env` file has correct `VITE_API_URL`
