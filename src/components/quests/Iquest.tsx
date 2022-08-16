interface Quest {
  _id: string;
  name: string;
  link?: string;
  status: boolean;
  steps: [
    {
      _id: string;
      text: string;
      link?: string;
      status?: boolean;
    }
  ]
}

export default Quest;