def success_response(data=None, message="Success", meta=None, status_code=200):
    return {
        "success": True,
        "message": message,
        "data": data,
        "meta": meta or {}
    }, status_code


def error_response(message="Something went wrong", code="ERROR", status_code=400):
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message
        }
    }, status_code