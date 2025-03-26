import requests
import socket
import platform
import time

BASE_URL = "http://localhost:8000/api"
CLIENT_NAME = socket.gethostname()
CLIENT_IP = socket.gethostbyname(CLIENT_NAME)
OS_TYPE = platform.system()

def register_client():
    data = {
        "hostname": CLIENT_NAME,
        "ip_address": CLIENT_IP,
        "os_type": OS_TYPE,
        "status": "online"
    }

    response = requests.post(f"{BASE_URL}/clients/", json=data)
    if response.status_code == 201:
        print(f"[✓] Registered client '{CLIENT_NAME}'")
        return response.json()["id"]
    elif response.status_code == 400 and "hostname" in response.json():
        print(f"[i] Client already registered. Looking up ID...")
        return lookup_client_id()
    else:
        print("[!] Error registering:", response.text)
        return None


def lookup_client_id():
    res = requests.get(f"{BASE_URL}/clients/")
    for c in res.json():
        if c["hostname"] == CLIENT_NAME:
            return c["id"]
    return None

def check_in(client_id):
    data = {"status": "online"}
    response = requests.patch(f"{BASE_URL}/clients/{client_id}/", json=data)
    print(f"[✓] Checked in as {CLIENT_NAME}")


def check_for_deployments(client_id):
    response = requests.get(f"{BASE_URL}/deployments/")
    for dep in response.json():
        if dep["status"] == "pending":
            # Try to claim it by assigning this client
            patch_resp = requests.patch(f"{BASE_URL}/deployments/{dep['id']}/", json={
                "client": client_id,
                "status": "in_progress"
            })
            if patch_resp.status_code == 200:
                print(f"[→] Claimed deployment {dep['id']}")
                return patch_resp.json()
    return None



def handle_deployment(deployment):
    dep_id = deployment["id"]
    print(f"[↓] Installing package {deployment['package']}...")
    
    # Mark in progress
    requests.patch(f"{BASE_URL}/deployments/{dep_id}/", json={"status": "in_progress"})
    
    time.sleep(5)  # simulate install
    
    # Mark complete
    requests.patch(f"{BASE_URL}/deployments/{dep_id}/", json={"status": "completed"})
    print(f"[✓] Completed deployment {dep_id}")


if __name__ == "__main__":
    client_id = register_client()
    if not client_id:
        print("Client could not register. Exiting.")
        exit()

    while True:
        check_in(client_id)
        deployment = check_for_deployments(client_id)
        if deployment:
            handle_deployment(deployment)
        time.sleep(10)  # interval
