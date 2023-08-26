var Module=typeof Module!="undefined"?Module:{};var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}process.on("uncaughtException",ex=>{if(ex!=="unwind"&&!(ex instanceof ExitStatus)&&!(ex.context instanceof ExitStatus)){throw ex}});quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmExports;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="module.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinarySync(binaryFile))}else if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["q"];updateMemoryViews();wasmTable=wasmExports["s"];addOnInit(wasmExports["r"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var moduleDefinitions=[];var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((dt,i)=>{if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}}var structRegistrations={};function __embind_finalize_value_object(structType){const valueObject=structRegistrations[structType];delete structRegistrations[structType];whenDependentTypesAreResolved([structType],valueObject.fieldTypeIds,function(types){moduleDefinitions.push(valueObject);for(let i=0;i<types.length;i++){valueObject.fields.push({name:valueObject.fieldNames[i],type:types[i]})}return[valueObject]})}function __embind_register_bigint(primitiveType,name,size,minRange,maxRange){registerPrimitiveType(primitiveType,name)}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}function sharedRegisterType(rawType,registeredInstance,options={}){var name=registeredInstance.name;if(!rawType){throwBindingError(`type "${name}" must have a positive integer typeid pointer`)}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError(`Cannot register type '${name}' twice`)}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb())}}function registerType(rawType,registeredInstance,options={}){return sharedRegisterType(rawType,registeredInstance,options)}class PrimitiveType{constructor(typeId,name){this.typeId=typeId;this.name=name}}function registerPrimitiveType(id,name){name=readLatin1String(name);registerType(id,new PrimitiveType(id,name))}function __embind_register_bool(rawType,name,size,trueValue,falseValue){registerPrimitiveType(rawType,name)}function __embind_register_emval(rawType,name){registerPrimitiveType(rawType,name)}function __embind_register_float(rawType,name,size){registerPrimitiveType(rawType,name)}class FunctionDefinition{constructor(name,returnType,argumentTypes,thisType=null){this.name=name;this.returnType=returnType;this.argumentTypes=argumentTypes;this.thisType=thisType}printSignature(nameMap,out){out.push("(");const argOut=[];for(const arg of this.argumentTypes){argOut.push(`${arg.name}: ${nameMap(arg.type)}`)}out.push(argOut.join(", "));out.push(`): ${nameMap(this.returnType)}`)}printFunction(nameMap,out){out.push(`${this.name}`);this.printSignature(nameMap,out);out.push(";\n")}printModuleEntry(nameMap,out){out.push("  ");this.printFunction(nameMap,out)}}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAPU32[firstElement+i*4>>2])}return array}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}class Argument{constructor(name,type){this.name=name;this.type=type}}function createFunctionDefinition(name,argCount,rawArgTypesAddr,hasThis,cb){const argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);whenDependentTypesAreResolved([],argTypes,function(argTypes){const returnType=argTypes[0];let thisType=null;let argStart=1;if(hasThis){thisType=argTypes[1];argStart=2}const args=[];for(let i=argStart;i<argTypes.length;i++){args.push(new Argument(`_${i-argStart}`,argTypes[i]))}const funcDef=new FunctionDefinition(name,returnType,args,thisType);cb(funcDef);return[]})}var __embind_register_function=function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn,isAsync){createFunctionDefinition(name,argCount,rawArgTypesAddr,false,funcDef=>{moduleDefinitions.push(funcDef)})};function __embind_register_integer(primitiveType,name,size,minRange,maxRange){registerPrimitiveType(primitiveType,name)}function __embind_register_memory_view(rawType,dataTypeIndex,name){}function __embind_register_std_string(rawType,name){registerPrimitiveType(rawType,name)}function __embind_register_std_wstring(rawType,charSize,name){registerPrimitiveType(rawType,name)}class ValueObjectDefinition{constructor(typeId,name){this.typeId=typeId;this.name=name;this.fieldTypeIds=[];this.fieldNames=[];this.fields=[]}print(nameMap,out){out.push(`export type ${this.name} = {\n`);const outFields=[];for(const{name:name,type:type}of this.fields){outFields.push(`  ${name}: ${nameMap(type)}`)}out.push(outFields.join(",\n"));out.push("\n};\n\n")}}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){name=readLatin1String(name);const valueObject=new ValueObjectDefinition(rawType,name);structRegistrations[rawType]=valueObject}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){const valueObject=structRegistrations[structType];assert(getterReturnType===setterArgumentType,"Mismatched getter and setter types are not supported.");valueObject.fieldTypeIds.push(getterReturnType);valueObject.fieldNames.push(readLatin1String(fieldName))}function __embind_register_void(rawType,name){registerPrimitiveType(rawType,name)}var _abort=()=>{abort("")};var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var abortOnCannotGrowMemory=requestedSize=>{abort("OOM")};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;abortOnCannotGrowMemory(requestedSize)};function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}class TsPrinter{constructor(definitions){this.definitions=definitions;const jsString="ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string";this.builtInToJsName=new Map([["bool","boolean"],["char","number"],["unsigned char","number"],["int","number"],["unsigned int","number"],["unsigned long","number"],["float","number"],["double","number"],["void","void"],["std::string",jsString],["std::basic_string<unsigned char>",jsString],["emscripten::val","any"]])}typeToJsName(type){if(type instanceof PrimitiveType){if(!this.builtInToJsName.has(type.name)){throw new Error(`Missing primitive type to TS type for '${type.name}'`)}return this.builtInToJsName.get(type.name)}return type.name}print(){const out=[];for(const def of this.definitions){if(!def.print){continue}def.print(this.typeToJsName.bind(this),out)}out.push("export interface MainModule {\n");for(const def of this.definitions){if(!def.printModuleEntry){continue}def.printModuleEntry(this.typeToJsName.bind(this),out)}out.push("}");console.log(out.join(""))}}function embindEmitTypes(){for(const typeId in awaitingDependencies){throwBindingError(`Missing type definition for '${getTypeName(typeId)}'`)}const printer=new TsPrinter(moduleDefinitions);printer.print()}InternalError=Module["InternalError"]=class InternalError extends Error{constructor(message){super(message);this.name="InternalError"}};BindingError=Module["BindingError"]=class BindingError extends Error{constructor(message){super(message);this.name="BindingError"}};embind_init_charCodes();addOnInit(embindEmitTypes);var wasmImports={j:__embind_finalize_value_object,k:__embind_register_bigint,g:__embind_register_bool,o:__embind_register_emval,f:__embind_register_float,i:__embind_register_function,b:__embind_register_integer,a:__embind_register_memory_view,e:__embind_register_std_string,c:__embind_register_std_wstring,p:__embind_register_value_object,d:__embind_register_value_object_field,h:__embind_register_void,l:_abort,n:_emscripten_memcpy_big,m:_emscripten_resize_heap};var asm=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["r"])();var ___getTypeName=a0=>(___getTypeName=wasmExports["t"])(a0);var __embind_initialize_bindings=Module["__embind_initialize_bindings"]=()=>(__embind_initialize_bindings=Module["__embind_initialize_bindings"]=wasmExports["u"])();var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();var _free=Module["_free"]=a0=>(_free=Module["_free"]=wasmExports["v"])(a0);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();