# TaskBoard - TP4 Angular

Vercel: [https://task-eta-kohl-26.vercel.app]

The Vercel deployment is for UI demonstration only. Data loading requires the local json-server backend.

## Installation

1. Clone the repository:
```git clone https://github.com/User-Bird/Task.git```

2. Navigate to the project directory:  
```cd Task```

3. Install dependencies:
```npm install```

## Running the Application

You must open two separate terminals.

Terminal 1 (Backend):
```npx json-server --watch db.json --port 3000```

Terminal 2 (Frontend):
```ng serve --open```
