from django.shortcuts import render
from django.http import JsonResponse
import subprocess

def replacer(code):
    code = code.strip()
    codeArr = code.splitlines();
    if(codeArr[0].strip() == "winter_is_start" ) && () :
            print("pass")
            codeArr.pop(0)
            codeArr.
    return codeArr
# IDE Page
def ide(request):
    if request.method == 'POST':
        data = request.POST.get('code', '')
        code = replacer(data)
        print(code)
        try:
            # Execute the code (for simplicity, only Python code is allowed)
            result = subprocess.check_output(
                ['python', '-c', code],
                stderr=subprocess.STDOUT,
                text=True,
                timeout=5
            )
        except subprocess.CalledProcessError as e:
            result = e.output
        except Exception as e:
            result = str(e)
        return JsonResponse({'output': result})
    return render(request, 'ide_app/ide.html')

# Static Page
def static_page(request):
    return render(request, 'ide_app/static_page.html')
