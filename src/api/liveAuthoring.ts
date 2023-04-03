import axios from 'axios';

export const startLiveAuthoring = async (suitId: string) => {
  const response = await axios.post(
    `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/suite/live-authorization/${suitId}/start`
  );
  return response;
};

export const stopLiveAuthoring = async (suitId: string) => {
  const response = await axios.post(
    `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/suite/live-authorization/${suitId}/stop`
  );
  return response;
};

export const saveStep = async (step: any) => {
  const response = await axios.post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/step`, step);
  return response;
};

export const runRegression = async (suitId:string,execType:string) => {
  const response = await axios.post(
    `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/suite/execute/${suitId}?execType=${execType}`
  );
  return response;
}

export const executeStep = async (stepId:string,executionId?:string) => {
  const data = executionId ? {execution_id: executionId} : {};
  const response = await axios.post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/step/execute/${stepId}`,
    );
  return response;
}

export const executionStatus = async (execId:string) => {
  const response = await axios.get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/execution/${execId}`);
  return response;
}

export const deleteSuite = async (suitId:string) => {
  const response = await axios.delete(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/suite/${suitId}`);
  return response;
}

export const deleteStep = async (stepId:string) => {
  const response = await axios.delete(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/v1/step/${stepId}`);
  return response;
}