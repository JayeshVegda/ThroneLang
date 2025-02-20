from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from string import whitespace
import re
from django.shortcuts import render
from django.http import JsonResponse
import subprocess



global_error = -1

compile_token = {
    "decarys": "print",
    "attack": "if",
    "attack_again": "elif",
    "fallback": "else",
    "watch": "while",
    "march": "for",
    "siege": "do",
    "declare": "def",
    "house": "class",
    "summon": "import",
    "rightful": "True",
    "traitor": "False",
    "claim " : "",
    "send": "return"
}

error_output = {
    0 : """The War is About to start, The Realm Is in Chaos: \nYour code must begin with the sacred words: `winter_is_coming`. \nWithout it, the long night will consume all.""",
    1 : """The War Is Won, But the Realm Lies in Ruin:\nYour code must end with the sacred words: `winter_is_ended`. \nWithout it, peace cannot return, and chaos will reign forever.""",
    2 : "You are not allowed to play game of throne"
}

# this function remove all useless whitespace
def cleaner(code):
    code = code.strip();
    prefix = "winter_is_coming"
    suffix = "winter_is_ended"
    global global_error
    if code == "":
        global_error = 2
        return code
        
    if not code.startswith(prefix):
        global_error = 0
        return code
    else:
        code = code.removeprefix(prefix)

        
    if not code.endswith(suffix):
        global_error = 1
        return code
    else : 
        code = code.removesuffix(suffix)
    
    


    lines = code.splitlines()
    
    return "\n".join(line.rstrip() for line in lines[1:-1] if line.rstrip() or line == "").strip()
    

def replacer(code):
    string = cleaner(code)
    result = []  # To store the processed lines

    # Split input string into individual lines
    lines = string.splitlines()

    for line in lines:
        if line.strip() == "":  # If the line is blank
            result.append(line)  # Preserve it unchanged
        else:
            leading_spaces = len(line) - len(line.lstrip())

            # Replace words in the line using compile_token
            for key, value in compile_token.items():
                # Replace word boundaries with regex for exact matches
                line = re.sub(rf'\b{key}\b', value, line)

            # Add the processed line to the result
            result.append(' ' * leading_spaces + line)

    # Join all processed lines into a single string
    return '\n'.join(result)

def error_cleaner(code):
    idx = 0
    codeArr = code.split();


    
    return code

@csrf_exempt
@require_http_methods(["POST"])
def receive_code(request):
    if request.method == 'POST':
        data = request.POST.get('code', '')
        # print("this is data" +data)
        code = replacer(data)
        # print(global_error)
        try:
            # Execute the code (for simplicity, only Python code is allowed)
            if global_error == -1:
                print(code)
                result = subprocess.check_output(
                    ['python', '-c', code],
                    stderr=subprocess.STDOUT,
                    text=True,
                    timeout=5
                )
                print(result)
            else:
                print("inside else block", global_error)
                print("this is code : " + code)
                result = error_output[global_error]
        except subprocess.check_output as e:
            result = error_cleaner(e.output)
            print(e.end_lineno)
        except Exception as e:
            result = str(e)
            print("deb 3")
        return JsonResponse({'output': result})
    return render(request, 'ide_app/ide.html')

# Static Page
def static_page(request):
    return render(request, 'ide_app/static_page.html')

def home(request):
    
    return render(request, 'ide_app/loader.html')