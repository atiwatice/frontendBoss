import Example from "../component/inner";
import React, { useState } from 'react';
import {  Button } from "antd";
import { handleAuthSSR } from '../utils/auth';

export default function Test() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
    <p>About Next.js</p>
<Example/>
  </div>
  );
}

