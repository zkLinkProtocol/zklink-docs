import React,{useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { withRouter } from "react-router-dom"

 export default withRouter(function Home(props) {
  const {siteConfig} = useDocusaurusContext();
  useEffect(() => {
    props.history.replace('/docs/Introduction')

  }, [])

   return  null;
})
