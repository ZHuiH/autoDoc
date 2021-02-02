<?php

/**
 * @doc\param(
 * names,
 * object,
 * true,
 * {"data":["name2","name2"]},
 * 
 * @param(depth1,object,false,
 *  @param(depth2,object,false,
 *      @param(depth3,object,false),
 *      @param(depth4,object,false),
 * )
 * ),
 * @description(这个是参数的说明),
 * )
 * @doc\api(get,/test/)
 * @doc\response(
 * @param(code,int),
 * @param(result,any),
 * @param(state,bool)
 * )
 */


/**
 * 
 * @doc\param(
 * obj,
 * object,
 * true,
 * @param(name,string,flase,test_name),
 * @param(age,int,flase,12),
 * @param(arr,array,flase,[3,5,6]),
 * )
 * @doc\group(分组1)
 * @doc\description(api说明)
 * @doc\param(names,object,true,{"data":["name2","name2"]},@description(这个是参数的说明),
 *  @param(depth1,object,false,
 *      @param(depth2,object,false,
 *          @param(depth3,int,false,null),
 *          @param(depthd2,float,false,null),
 *  )
 * )
 * )
 * @doc\api(post,/user/{id})
 * @doc\auth(head,token)
 */
