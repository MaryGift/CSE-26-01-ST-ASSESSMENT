from django.shortcuts import render,redirect
from .models import Category, Product   
from .forms import CategoryForm, ProductForm

# Create your views here.
# landing page
def home(request):
    return render(request, 'index.html')

# dashboard view logic
def dashboard(request):
    products = Product.objects.all()
    categories = Category.objects.all()
    category_form = CategoryForm()
    product_form = ProductForm()
    
    if request.method == 'POST':
        if 'add_category' in request.POST:
            category_form = CategoryForm(request.POST)
            if category_form.is_valid():
                category_form.save()
                return redirect('dashboard')
        elif 'add_product' in request.POST:
            product_form = ProductForm(request.POST, request.FILES)
            if product_form.is_valid():
                product_form.save()
                return redirect('dashboard.html')
    
    context = {
        'products': products,
        'categories': categories,
        'category_form': category_form,
        'product_form': product_form,
    }
    return render(request, 'dashboard.html', context)

def add_category(request):

    if request.method == 'POST':

        form = CategoryForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('add_category')

    else:
        form = CategoryForm()

    context = {
        'form': form
    }

    return render(request, 'addCategory.html', context)

def category_list(request):
    categories = Category.objects.all()
    return render(request, 'categoryList.html', {'categories': categories})



