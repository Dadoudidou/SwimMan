${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    //Template(Settings settings)
    //{
    //    settings.IncludeProject("Project.Name");
    //    settings.OutputExtension = ".tsx";
    //}

    IEnumerable<Type> DefinedTypes(Class c){
		return c.Properties.Where(p => p.Type.Unwrap().IsDefined && !p.Type.Unwrap().IsEnum).Select(p => p.Type.Unwrap());
	}

	bool HasBaseClass(Type c){
		return c.BaseClass != null;
	}

    string TransInterfaceToObject(Type c){
        return c.ToString();
    }

	bool HasDefinedType(Type c){
		return c.Unwrap().IsDefined;
	}

    string DefaultValue(Property property){
        if(property.Type.IsGeneric || property.Type.IsDate || property.Type.IsEnum || property.Type.IsEnumerable || property.Type.IsPrimitive)
            return (property.Type.Default() != "null") ? property.Type.Default() : "undefined";
        
        return (property.Type.Default() == "null") ? "undefined" : property.Type.Default();
        //return "new " + TransInterfaceToObject(property)+ "()";
        //return (property.Type.Default() == "null") ? "{}" : property.Type.Default();
    }

    string TransInterfaceToObject(Property property){
        return TransInterfaceToObject(property.Type);
    }

    // Custom extension methods can be used in the template by adding a $ prefix e.g. $LoudName
    string LoudName(Property property)
    {
        return property.Name.ToUpperInvariant();
    }

    bool IsDefaultTypeNull(Type c)
    {
        return (c.Default() == null);
    }

}

    $Classes(Layer_datas.Services.Objects.*)[$DefinedTypes[
        import { $TransInterfaceToObject } from "./$HasBaseClass[$BaseClass][$TransInterfaceToObject]";
    ]]

    import * as assign from "object-assign";

    $Classes(Layer_datas.Services.Objects.*)[

    $NestedEnums[
        type $Name = $Values["$Name"][ | ];
    ]


    class $Name$BaseClass[ extends $Name ] {
        

        $Properties[
        // $LoudName
        public $name: $TransInterfaceToObject = $DefaultValue;]

        constructor(init?: Partial<$Name$BaseClass>){
            assign(this, init);
        }
        
    }]


export { $Classes(Layer_datas.Services.Objects.*)[ $Name][,] }



