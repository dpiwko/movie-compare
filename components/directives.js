/**
 * Created by Dawid on 2016-11-20.
 */
/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout){
    return {
        link: function(scope, element){
            var listener = function(event, toState ){
                // Default title - load on Dashboard 1
                var title = 'Movie Compare';
                // Create your own title pattern
                if(toState.data && toState.data.pageTitle){
                    title = 'Movie Compare | ' + toState.data.pageTitle;
                }
                $timeout(function(){
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
}

function ngBindHtmlIfSafe($compile, $sce){
    return function(scope, element, attrs){
        scope.$watch(
            function(scope){
                return scope.$eval(attrs.ngBindHtmlIfSafe);
            },
            function(value){
                var sanitizedHtml = null;
                try {
                    sanitizedHtml = $sce.getTrustedHtml(value);
                } catch(ex){
                }

                if(sanitizedHtml != null){
                    element.html(sanitizedHtml);
                } else {
                    element.text(value);
                }

                $compile(element.contents())(scope);
            }
        );
    };
}

/**
 *
 * Pass all functions into module
 */
appDirectives
    .directive('pageTitle', pageTitle)
    .directive('ngBindHtmlIfSafe', ngBindHtmlIfSafe);